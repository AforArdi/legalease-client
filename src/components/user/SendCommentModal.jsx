"use client";

import { Modal, Button, Form, TextField, Label, TextArea, Input } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { postComment } from "@/lib/api/comment/comment";

export default function SendCommentModal({ lawyer, user }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const isLoggedIn = !!user;

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const message = formData.get("message");

        if (!message || message.trim() === "") {
            toast.error("Please enter a message");
            return;
        }

        setIsLoading(true);
        try {
            const payload = {
                userEmail: user.email,
                lawyerEmail: lawyer.email,
                lawyerName: lawyer.name,
                comment: message,
                createdAt: new Date().toISOString()
            };
            const response = await postComment(payload);

            toast.success("Comment sent successfully!");
            setIsOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to send comment.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <Button onPress={() => setIsOpen(true)} className="bg-[#E5C365] hover:bg-[#d4b052] text-[#0A2519] font-bold rounded-none tracking-wide shadow-sm">
                Leave a Review
            </Button>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading className="text-xl font-bold text-[#0A2519]">
                                Review {lawyer?.name}
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="py-4">
                            {!isLoggedIn ? (
                                <p className="text-gray-600">Please log in to your account to leave a review.</p>
                            ) : (
                                <Form onSubmit={handleCommentSubmit} className="space-y-4 w-full">
                                    <p className="text-gray-600">
                                        You are leaving a public review for <strong className="text-gray-900">{lawyer?.name}</strong>.
                                    </p>

                                    <TextField className="w-full" name="message" variant="secondary">
                                        <Label>Message</Label>
                                        <Input placeholder="Enter your message" />
                                    </TextField>

                                    <div className="flex justify-end pt-4">
                                        <Button
                                            type="submit"
                                            isLoading={isLoading}
                                            className="bg-[#0A2519] text-white px-6"
                                        >
                                            Submit Review
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
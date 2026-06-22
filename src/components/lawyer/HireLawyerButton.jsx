"use client";

import { Modal, Button } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { createHiringReq } from "@/lib/api/user/user";

export default function HireLawyerButton({ lawyer, user }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const isLoggedIn = !!user;
    // We assume the user role is 'user' based on standard conventions, modify if it's 'client'
    const userRole = user?.role;
    const canHire = isLoggedIn && userRole === "user";

    const firstName = lawyer?.name?.split(' ')[0] || "Lawyer";

    const handleHiringReq = async () => {
        setIsLoading(true);
        try {
            const payload = {
                userName: user.name,
                userEmail: user.email,
                lawyerName: lawyer.name,
                lawyerEmail: lawyer.email,
                fee: lawyer.fee,
                status: "Pending",
                createdAt: new Date().toISOString()
            };
            const response = await createHiringReq(payload);

            if (response.message === "You have already sent a hiring request to this lawyer") {
                toast.error(response.message);
            } else {
                toast.success("Hiring request sent successfully!");
                setIsOpen(false);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to send hiring request.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <Button isDisabled={lawyer.status === "Busy"} onPress={() => setIsOpen(true)} className="w-full bg-[#E5C365] hover:bg-[#d4b052] text-[#0A2519] font-bold rounded-none py-6 tracking-wide shadow-sm">
                Hire {firstName}
            </Button>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading className="text-xl font-bold text-[#0A2519]">
                                Hire {lawyer?.name}
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="py-4">
                            {!isLoggedIn ? (
                                <p className="text-gray-600">Please log in to your account to send a hiring request.</p>
                            ) : !canHire ? (
                                <p className="text-red-600 font-medium">Only standard users can hire a lawyer. You are currently logged in with a different role.</p>
                            ) : (
                                <div className="space-y-4">
                                    <p className="text-gray-600">
                                        You are about to send a hiring request to <strong className="text-gray-900">{lawyer?.name}</strong>.
                                    </p>
                                    <p className="text-sm text-gray-500 bg-gray-50 p-3 border border-gray-100 rounded-sm">
                                        Consultation fee: <strong className="text-gray-800">${lawyer?.fee || 0}/HR</strong><br />
                                        The lawyer will review your request and get back to you shortly.
                                    </p>
                                </div>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            {canHire && (
                                <Button
                                    onPress={handleHiringReq}
                                    isLoading={isLoading}
                                    className="bg-[#0A2519] text-white"
                                >
                                    Confirm Request
                                </Button>
                            )}
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}

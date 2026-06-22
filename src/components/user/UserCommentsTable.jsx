"use client";

import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Modal, Form, TextField, Label, TextArea, Input } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { editComment, deleteComment } from "@/lib/api/comment/comment";

export default function UserCommentsTable({ userComments: initialComments }) {

  const validComments = Array.isArray(initialComments) ? initialComments : [];

  const [comments, setComments] = useState(initialComments || []);
  const [isDeleting, setIsDeleting] = useState(false);

  // Edit Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const handleDeleteClick = (comment) => {
    setCommentToDelete(comment);
    setIsDeleteModalOpen(true);
  };

  const handleCommentDelete = async () => {
    if (!commentToDelete) return;
    setIsDeleting(true);
    try {
      await deleteComment(commentToDelete._id);
      setComments(comments.filter(comment => comment._id !== commentToDelete._id));
      toast.success("Comment deleted successfully");
      setIsDeleteModalOpen(false);
      setCommentToDelete(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete comment");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditClick = (comment) => {
    setEditingComment(comment);
    setIsOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCommentContent = formData.get("comment");

    if (!newCommentContent || newCommentContent.trim() === "") {
      toast.error("Please enter a comment");
      return;
    }

    setIsEditing(true);
    try {
      await editComment(editingComment._id, { comment: newCommentContent });
      setComments(comments.map(comment =>
        comment._id === editingComment._id ? { ...comment, comment: newCommentContent } : comment
      ));
      toast.success("Comment updated successfully");
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update comment");
    } finally {
      setIsEditing(false);
    }
  };

  const renderCell = (comment, columnKey) => {
    switch (columnKey) {
      case "lawyerName":
        return <span className="text-sm font-medium text-[#0A2519]">{comment.lawyerName || "Unknown Lawyer"}</span>;
      case "lawyerEmail":
        return <span className="text-sm text-gray-600">{comment.lawyerEmail}</span>;
      case "comment":
        return <p className="text-sm text-gray-800 line-clamp-2 max-w-xs" title={comment.comment}>{comment.comment}</p>;
      case "date":
        return <span className="text-sm text-gray-600">{new Date(comment.createdAt).toLocaleDateString()}</span>;
      case "actions":
        return (
          <div className="flex gap-2 items-center">
            <Button size="sm" variant="flat" onPress={() => handleEditClick(comment)}>
              Edit
            </Button>
            <Button size="sm" color="danger" variant="flat" onPress={() => handleDeleteClick(comment)}>
              Delete
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full mt-6">
      <div className="w-full relative shadow-sm border border-gray-100 rounded-lg overflow-hidden">
        <Table
          aria-label="User comments table"
          className="bg-[#F3F5F2] min-h-[200px] min-w-full rounded-none"
        >
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header>
                <Table.Column isRowHeader>LAWYER NAME</Table.Column>
                <Table.Column>LAWYER EMAIL</Table.Column>
                <Table.Column>COMMENT</Table.Column>
                <Table.Column>DATE</Table.Column>
                <Table.Column>ACTIONS</Table.Column>
              </Table.Header>
              <Table.Body items={validComments} emptyContent="No comments found.">
                {(item) => (
                  <Table.Row key={item._id} className="hover:bg-white/40 transition-colors">
                    <Table.Cell>{renderCell(item, "lawyerName")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "lawyerEmail")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "comment")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "date")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "actions")}</Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading className="text-xl font-bold text-[#0A2519]">
                  Edit Comment
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body className="py-4">
                <Form onSubmit={handleEditSubmit} className="space-y-4 w-full">
                  <TextField className="w-full" name="comment" variant="secondary" defaultValue={editingComment?.comment}>
                    <Label>Comment</Label>
                    <Input placeholder="Enter your updated comment" />
                  </TextField>
                  <div className="flex justify-end pt-4 gap-2">
                    <Button variant="light" onPress={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" isLoading={isEditing} className="bg-[#0A2519] text-white">
                      Save Changes
                    </Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[400px]">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading className="text-xl font-bold text-[#0A2519]">
                  Delete Comment
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body className="py-2">
                <p className="text-gray-700">
                  Are you sure you want to delete this comment? This action cannot be undone.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <div className="flex justify-end gap-2 w-full pt-2">
                  <Button variant="light" onPress={() => setIsDeleteModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-red-500 text-white font-medium" onPress={handleCommentDelete} isLoading={isDeleting}>
                    Delete
                  </Button>
                </div>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}

"use client";

import { Button, Table, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, Avatar } from "@heroui/react";
import { UserCog, Ban } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { changeUserRole, deleteUser } from "@/lib/api/admin/admin";

export default function ManageUsersTable({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers || []);
  const [isProcessing, setIsProcessing] = useState(false);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleRoleChange = async (targetUser, newRole) => {
    if (targetUser.role === newRole) return;
    setIsProcessing(true);
    try {
      await changeUserRole(targetUser.email, targetUser.role, newRole);
      setUsers(users.map(user =>
        user.email === targetUser.email ? { ...user, role: newRole } : user
      ));
      toast.success(`User role changed to ${newRole}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to change user role");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleUserDelete = async () => {
    if (!userToDelete) return;
    setIsProcessing(true);
    try {
      await deleteUser(userToDelete.email, userToDelete.role);
      setUsers(users.filter(user => user.email !== userToDelete.email));
      toast.success("User deleted successfully");
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderCell = (user, columnKey) => {
    switch (columnKey) {
      case "avatar":
        return (
          <Avatar radius="lg" src={user.image} name={user.name?.charAt(0) || user.email?.charAt(0)} />
        );
      case "name_email":
        return (
          <div className="flex flex-col">
            <span className="text-[#0A2519] font-bold text-base">{user.name || "Unknown User"}</span>
            <span className="text-gray-500 text-sm">{user.email}</span>
          </div>
        );
      case "role":
        return (
          <Chip className="capitalize bg-gray-100 text-gray-700 font-medium" size="sm" radius="sm">
            {user.role}
          </Chip>
        );
      case "joined": {
        let displayDate = "2023-10-14";
        if (user.createdAt) {
          const dateStr = typeof user.createdAt === 'string' ? user.createdAt : String(user.createdAt);
          displayDate = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr.substring(0, 10);
        }
        return (
          <span className="text-sm text-gray-500">
            {displayDate}
          </span>
        );
      }
      case "actions":
        return (
          <div className="flex items-center gap-4 text-gray-500">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly variant="light" size="sm" className="text-gray-500 hover:text-gray-900 focus:outline-none min-w-unit-0" isLoading={isProcessing}>
                  <UserCog size={20} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Role Actions">
                <DropdownItem key="user" onPress={() => handleRoleChange(user, 'user')}>Make User</DropdownItem>
                <DropdownItem key="lawyer" onPress={() => handleRoleChange(user, 'lawyer')}>Make Lawyer</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Button isIconOnly variant="light" size="sm" className="text-gray-500 hover:text-red-500 focus:outline-none min-w-unit-0" onPress={() => handleDeleteClick(user)} isLoading={isProcessing}>
              <Ban size={20} />
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full relative shadow-sm border border-gray-100 rounded-lg overflow-hidden">
        <Table aria-label="Manage Users Table" className="bg-[#F3F5F2] min-h-[200px] min-w-full rounded-none">
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header>
                <Table.Column isRowHeader>Avatar</Table.Column>
                <Table.Column>Name & Email</Table.Column>
                <Table.Column>Role</Table.Column>
                <Table.Column>Joined</Table.Column>
                <Table.Column align="end">Actions</Table.Column>
              </Table.Header>
              <Table.Body items={users} emptyContent="No users found.">
                {(item) => (
                  <Table.Row key={item.email} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                    <Table.Cell>{renderCell(item, "avatar")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "name_email")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "role")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "joined")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "actions")}</Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      <Modal isOpen={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[400px]">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading className="text-xl font-bold text-[#0A2519]">
                  Delete User
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body className="py-2">
                <p className="text-gray-700">
                  Are you sure you want to delete <strong className="text-gray-900">{userToDelete?.name || userToDelete?.email}</strong>? This action cannot be undone.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <div className="flex justify-end gap-2 w-full pt-2">
                  <Button variant="light" onPress={() => setIsDeleteModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-red-500 text-white font-medium" onPress={handleUserDelete} isLoading={isProcessing}>
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

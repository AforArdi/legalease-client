import ManageUsersTable from "@/components/admin/ManageUsersTable";
import { getAllUsers } from "@/lib/api/admin/admin";

const AdminManageUsers = async () => {
    const users = await getAllUsers();

    return (
        <div className="w-full">
            <div>
                <h1 className="text-3xl font-bold text-[#0A2519] mb-2">Manage Users</h1>
                <p className="text-gray-600 text-sm mb-6">View, manage, and change roles for all users and lawyers in the system.</p>
            </div>
            
            <ManageUsersTable initialUsers={users} />
        </div>
    );
};

export default AdminManageUsers;
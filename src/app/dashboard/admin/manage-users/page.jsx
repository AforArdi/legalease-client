import ManageUsersTable from "@/components/admin/ManageUsersTable";
import { getAllUsers } from "@/lib/api/admin/admin";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function AdminManageUsers({ searchParams }) {
    const { page } = await searchParams;
    const currentPage = parseInt(page) || 1;

    // Get the token on the server side
    const { token } = await auth.api.getToken({
        headers: await headers(),
    }) || {};

    const response = await getAllUsers({ page: currentPage, limit: 10 }, token);

    const users = response.data || [];
    const totalPages = response.totalPages || 1;

    return (
        <div className="w-full">
            <div>
                <h1 className="text-3xl font-bold text-[#0A2519] mb-2">Manage Users</h1>
                <p className="text-gray-600 text-sm mb-6">View, manage, and change roles for all users and lawyers in the system.</p>
            </div>

            <ManageUsersTable initialUsers={users} totalPages={totalPages} currentPage={currentPage} />
        </div>
    );
}
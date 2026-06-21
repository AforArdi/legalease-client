import { serverFetch, serverMutation } from "../core/server";

export const getAllUsers = async () => {
    return await serverFetch('/admin/users');
}
export const changeUserRole = async (email, currentRole, newRole) => {
    return await serverMutation('/admin/users/role', 'PATCH', { email, currentRole, newRole });
}
export const deleteUser = async (email, role) => {
    const query = new URLSearchParams({ role }).toString();
    return await serverMutation(`/admin/users/${email}?${query}`, 'DELETE');
}
export const getAllTransactions = async () => {
    return await serverFetch('/admin/transactions');
}
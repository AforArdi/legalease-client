import { serverFetch, serverMutation } from "../core/server";

export const getAllUsers = async (params = {}, customToken = null) => {
    const query = new URLSearchParams(params).toString();
    const url = query ? `/admin/users?${query}` : '/admin/users';
    return await serverFetch(url, customToken);
}
export const changeUserRole = async (email, currentRole, newRole) => {
    return await serverMutation('/admin/users/role', 'PATCH', { email, currentRole, newRole });
}
export const deleteUser = async (email, role) => {
    const query = new URLSearchParams({ role }).toString();
    return await serverMutation(`/admin/users/${email}?${query}`, 'DELETE');
}
export const getAllTransactions = async (customToken = null) => {
    return await serverFetch('/admin/transactions', customToken);
}
export const getAllLawyers = async (customToken = null) => {
    return await serverFetch('/admin/lawyers', customToken);
}
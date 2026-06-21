import { serverFetch, serverMutation } from "../core/server";

export const getMyHiringReq = async (userEmail) => {
    const query = new URLSearchParams({ userEmail }).toString();
    return await serverFetch(`/user/hiring?${query}`);
}
export const createHiringReq = async (data) => {
    return await serverMutation('/user/hiring', 'POST', data);
}
export const getUserByEmail = async (email) => {
    const query = new URLSearchParams({ email }).toString();
    return await serverFetch(`/user?${query}`);
}
export const updateUserProfile = async (data) => {
    return await serverMutation('/user', 'POST', data);
}
import { serverFetch, serverMutation } from "../core/server";

export const getMyHiringReq = async (userEmail, customToken = null) => {
    const query = new URLSearchParams({ userEmail }).toString();
    return await serverFetch(`/user/hiring?${query}`, customToken);
}
export const createHiringReq = async (data) => {
    return await serverMutation('/user/hiring', 'POST', data);
}
export const getUserByEmail = async (email, customToken = null) => {
    const query = new URLSearchParams({ email }).toString();
    return await serverFetch(`/user?${query}`, customToken);
}
export const updateUserProfile = async (data) => {
    return await serverMutation('/user', 'POST', data);
}
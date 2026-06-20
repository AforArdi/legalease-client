import { serverFetch, serverMutation } from "../core/server";

export const getMyHiringReq = async (userEmail) => {
    const query = new URLSearchParams({ userEmail }).toString();
    return await serverFetch(`/user/hiring?${query}`);
}
export const createHiringReq = async (data) => {
    return await serverMutation('/user/hiring', 'POST', data);
}

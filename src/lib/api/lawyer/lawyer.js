import { serverFetch, serverMutation } from "../core/server";

export const getLawyers = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = query ? `/lawyers?${query}` : '/lawyers';
    return await serverFetch(url);
}
export const getLawyerById = async (id) => {
    return await serverFetch(`/lawyers/${id}`);
}
export const updateLawyerProfile = async (data) => {
    return await serverMutation('/lawyers', 'POST', data);
}
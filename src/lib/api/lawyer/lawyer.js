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
export const getLawyerHiringReq = async (lawyerEmail) => {
    const query = new URLSearchParams({ lawyerEmail }).toString();
    return await serverFetch(`/lawyer/hiring?${query}`);
}
export const updateHiringReqStatus = async (id, status) => {
    return await serverMutation(`/lawyer/hiring/${id}`, 'PATCH', { status });
}
export const getTopLawyers = async () => {
    return await serverFetch('/lawyers/top');
}
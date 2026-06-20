import { serverFetch } from "../core/server";

export const getLawyers = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = query ? `/lawyers?${query}` : '/lawyers';
    return await serverFetch(url);
}
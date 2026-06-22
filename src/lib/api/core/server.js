import { baseUrl } from "../../baseUrl";
import { authClient } from "@/lib/auth-client";

export const serverMutation = async (path, method, data) => {
    const { data: tokenData } = await authClient.token();
    const headers = {
        'Content-Type': 'application/json',
    };
    
    if (tokenData?.token) {
        headers['Authorization'] = `Bearer ${tokenData.token}`;
    }

    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: headers,
        body: JSON.stringify(data),
    });
    return res.json();
};

export const serverFetch = async (path) => {
    const { data: tokenData } = await authClient.token();
    const headers = {};
    
    if (tokenData?.token) {
        headers['Authorization'] = `Bearer ${tokenData.token}`;
    }

    const res = await fetch(`${baseUrl}${path}`, {
        cache: 'no-store',
        headers: headers,
    });
    return res.json();
};
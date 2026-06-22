import { baseUrl } from "../../baseUrl";
import { authClient } from "@/lib/auth-client";

export const serverMutation = async (path, method, data, customToken = null) => {
    let tokenStr = customToken;
    if (!tokenStr) {
        try {
            const { data: tokenData } = await authClient.token();
            tokenStr = tokenData?.token;
        } catch (e) {
            // handle error gracefully
        }
    }

    const headers = {
        'Content-Type': 'application/json',
    };
    
    if (tokenStr) {
        headers['Authorization'] = `Bearer ${tokenStr}`;
    }

    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: headers,
        body: JSON.stringify(data),
    });
    return res.json();
};

export const serverFetch = async (path, customToken = null) => {
    let tokenStr = customToken;
    if (!tokenStr) {
        try {
            const { data: tokenData } = await authClient.token();
            tokenStr = tokenData?.token;
        } catch (e) {
            // handle error gracefully
        }
    }

    const headers = {};
    
    if (tokenStr) {
        headers['Authorization'] = `Bearer ${tokenStr}`;
    }

    const res = await fetch(`${baseUrl}${path}`, {
        cache: 'no-store',
        headers: headers,
    });
    return res.json();
};
import { baseUrl } from "../../baseUrl";
import { authClient } from "@/lib/auth-client";

// Resolves the JWT token on the client side.
// Server Components should pass the token explicitly via the customToken parameter.
const getToken = async () => {
    try {
        const { data: tokenData } = await authClient.token();
        if (tokenData?.token) return tokenData.token;
    } catch (e) {
        // Not in a client context
    }
    return null;
};

export const serverMutation = async (path, method, data, customToken = null) => {
    const tokenStr = customToken || await getToken();

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
    const tokenStr = customToken || await getToken();

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
'use server'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return session?.user || null;
};
export const getAuthToken = async () => {
    try {
        const { token } = await auth.api.getToken({
            headers: await headers(),
        }) || {};
        return token || null;
    } catch (e) {
        return null;
    }
};
export const verifyRole = async (role) => {
    const user = await getUserSession();

    if (!user) {
        redirect('/auth/login');
    }
    if (user?.role !== role) {
        redirect('/unauthorized');
    }

    return user;
};

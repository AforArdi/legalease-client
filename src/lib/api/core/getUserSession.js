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

export const getFreshUser = async (email) => {
    if (!email) return null;
    
    // Import db to fetch fresh user directly bypassing JWT cache
    const { db } = await import('@/lib/auth');
    const user = await db.collection('user').findOne({ email });
    
    if (user && user._id) {
        user._id = user._id.toString(); // convert ObjectId to string for Client Component
    }
    
    return user || null;
};

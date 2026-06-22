import { verifyRole } from "@/lib/api/core/getUserSession";

const UserLayout = async ({ children }) => {
    await verifyRole('user');
    return children;
};

export default UserLayout;
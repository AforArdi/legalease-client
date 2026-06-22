import { verifyRole } from "@/lib/api/core/getUserSession";

const AdminLayout = async ({ children }) => {
    await verifyRole('admin');
    return children;
};

export default AdminLayout;
import { verifyRole } from "@/lib/api/core/getUserSession";

const LawyerLayout = async ({ children }) => {
    await verifyRole('lawyer');
    return children;
};

export default LawyerLayout;
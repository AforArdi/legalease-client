import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/api/getUserSession";

export default async function ChooseRoleLayout({ children }) {
    const user = await getUserSession();

    if (!user) {
        redirect("/auth/login");
    }

    // If they already picked a role (not pending), kick them to the home page
    if (user.role && user.role !== "pending") {
        redirect("/");
    }

    return (
        <>
            {children}
        </>
    );
}

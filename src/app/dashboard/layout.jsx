import { redirect } from "next/navigation";
import DashboardSlider from "@/components/dashboard/DashboardSlider";
import { getUserSession } from "@/lib/api/core/getUserSession";

export default async function DashboardLayout({ children }) {
    const user = await getUserSession();
    if (!user) {
        redirect("/auth/login");
    }
    if (user.role === "pending") {
        redirect("/choose-role");
    }

    return (
        <div className="flex h-screen bg-background">
            <div className="flex flex-1 overflow-hidden">
                <DashboardSlider role={user?.role}></DashboardSlider>
                <main className="flex-1 overflow-y-auto px-5 pb-10">
                    {children}
                </main>
            </div>
        </div>
    );
}

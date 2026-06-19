import { getUserSession } from "@/lib/api/getUserSession";

const LawyerDashboardHome = async () => {
    const user = await getUserSession();
    const { name } = user;

    return (
        <div className="flex flex-col gap-6 p-6 md:p-10 w-full max-w-6xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-[#0A2519] mb-2">Welcome back, {name}</h1>
                <p className="text-gray-600 text-sm">Here is a quick overview of your legal practice and upcoming tasks.</p>
            </div>
            
            <div className="p-8 bg-[#F3F5F2] border border-gray-200/60 rounded-xl mt-4">
                <p className="text-[#0A2519] font-medium">
                    Your dashboard is currently being set up. Please use the navigation menu to view your hiring requests or manage your legal profile.
                </p>
            </div>
        </div>
    );
};

export default LawyerDashboardHome;
import { getUserSession } from "@/lib/api/core/getUserSession";
import { Card, Button } from "@heroui/react";
import Link from "next/link";
import { FiBriefcase, FiUser } from "react-icons/fi";

const LawyerDashboardHome = async () => {
    const user = await getUserSession();
    const { name } = user;

    return (
        <div className="flex flex-col gap-6 p-6 md:p-10 w-full max-w-6xl mx-auto">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-[#0A2519] mb-2">Welcome back, {name}</h1>
                <p className="text-gray-600 text-sm">Here is a quick overview of your legal practice and upcoming tasks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">

                {/* Quick Actions Card */}
                <Card className="p-6 bg-white shadow-sm border border-gray-100 rounded-2xl lg:col-span-2">
                    <h2 className="text-lg font-bold text-[#0A2519] mb-4">Quick Actions</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Access your most frequently used tools to manage your practice efficiently.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Fix: Wrapped Button inside Link instead of using as={Link} */}
                        <Link href="/dashboard/lawyer/hiring-history" className="w-full">
                            <Button
                                variant="flat"
                                className="w-full justify-start bg-[#EAECE8] text-[#0A2519] font-medium hover:bg-[#D4D8CF]"
                            >
                                <FiBriefcase className="text-lg mr-2" /> Review Hiring Requests
                            </Button>
                        </Link>

                        {/* Fix: Wrapped Button inside Link instead of using as={Link} */}
                        <Link href="/dashboard/lawyer/manage-legal-profile" className="w-full">
                            <Button
                                variant="flat"
                                className="w-full justify-start bg-[#EAECE8] text-[#0A2519] font-medium hover:bg-[#D4D8CF]"
                            >
                                <FiUser className="text-lg mr-2" /> Update Legal Profile
                            </Button>
                        </Link>
                    </div>
                </Card>

                {/* Practice Status Card */}
                <Card className="p-6 bg-[#0A2519] shadow-sm rounded-2xl text-white">
                    <h2 className="text-lg font-bold mb-4">Practice Status</h2>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="text-sm text-gray-300">Profile Visibility</span>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                                <span className="text-sm font-medium text-success">Active</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="text-sm text-gray-300">Pending Requests</span>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-white">0</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-300">Active Cases</span>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-white">0</span>
                            </div>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
};

export default LawyerDashboardHome;
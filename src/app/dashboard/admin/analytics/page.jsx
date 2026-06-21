import { getAllLawyers, getAllTransactions, getAllUsers } from "@/lib/api/admin/admin";
import { Card } from "@heroui/react";
import { Users, UserCircle, Briefcase, DollarSign } from "lucide-react";

const AdminAnalytics = async () => {
    const transactions = await getAllTransactions() || [];
    const allUsers = await getAllUsers() || [];
    const allLawyers = await getAllLawyers() || [];

    const totalHires = transactions.length;
    // allUsers contains everyone, so we filter by role to just get standard users
    const activeUsers = allUsers.filter(user => user.role === 'user').length;
    const registeredLawyers = allLawyers.length;

    // Calculate total revenue using the string "fee" property
    const totalRevenue = transactions.reduce((acc, curr) => {
        return acc + Number(curr.fee || 0);
    }, 0);

    return (
        <div className="w-full">
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold text-[#0A2519]">Platform Analytics</h1>
                <p className="text-gray-600 text-sm">Overview of platform metrics and total revenue.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Users Card */}
                <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden bg-white">
                    <Card.Header className="flex flex-row items-center justify-between px-6 pt-6 pb-2">
                        <Card.Description className="text-xs uppercase tracking-widest text-gray-500 font-bold m-0">
                            Total Users
                        </Card.Description>
                        <UserCircle size={20} className="text-[#0A2519] opacity-70" />
                    </Card.Header>
                    <Card.Content className="px-6 pb-6">
                        <Card.Title className="text-4xl font-bold text-[#0A2519]">
                            {activeUsers}
                        </Card.Title>
                    </Card.Content>
                </Card>

                {/* Registered Lawyers Card */}
                <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden bg-white">
                    <Card.Header className="flex flex-row items-center justify-between px-6 pt-6 pb-2">
                        <Card.Description className="text-xs uppercase tracking-widest text-gray-500 font-bold m-0">
                            Total Lawyers
                        </Card.Description>
                        <Briefcase size={20} className="text-[#0A2519] opacity-70" />
                    </Card.Header>
                    <Card.Content className="px-6 pb-6">
                        <Card.Title className="text-4xl font-bold text-[#0A2519]">
                            {registeredLawyers}
                        </Card.Title>
                    </Card.Content>
                </Card>

                {/* Total Hires Card */}
                <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden bg-white">
                    <Card.Header className="flex flex-row items-center justify-between px-6 pt-6 pb-2">
                        <Card.Description className="text-xs uppercase tracking-widest text-gray-500 font-bold m-0">
                            Total Hires
                        </Card.Description>
                        <Users size={20} className="text-[#0A2519] opacity-70" />
                    </Card.Header>
                    <Card.Content className="px-6 pb-6">
                        <Card.Title className="text-4xl font-bold text-[#0A2519]">
                            {totalHires}
                        </Card.Title>
                    </Card.Content>
                </Card>

                {/* Total Revenue Card - Highlighted in Brand Color */}
                <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden bg-[#0A2519] text-white">
                    <Card.Header className="flex flex-row items-center justify-between px-6 pt-6 pb-2">
                        <Card.Description className="text-xs uppercase tracking-widest text-gray-300 font-bold m-0">
                            Total Revenue
                        </Card.Description>
                        <DollarSign size={20} className="text-white opacity-70" />
                    </Card.Header>
                    <Card.Content className="px-6 pb-6">
                        <Card.Title className="text-4xl font-bold text-white">
                            ${totalRevenue.toLocaleString()}
                        </Card.Title>
                    </Card.Content>
                </Card>
            </div>
        </div>
    );
};

export default AdminAnalytics;
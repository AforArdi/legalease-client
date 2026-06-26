"use client";

import { Card, Button, Chip, Avatar } from "@heroui/react";
import Link from "next/link";
import { FiUsers, FiDollarSign, FiActivity, FiArrowRight } from "react-icons/fi";

export default function AdminOverviewPage() {
    // Note: In a real scenario, you would fetch these from your backend
    // e.g., using your /admin/transactions and /admin/users endpoints, sorted by date.
    const recentActivity = [
        { id: 1, type: "hire", user: "Michael Chen", lawyer: "Sarah Jenkins", amount: "$150", time: "2 hours ago", status: "Paid" },
        { id: 2, type: "signup", user: "Elena Rodriguez", role: "Lawyer", time: "5 hours ago", status: "New" },
        { id: 3, type: "hire", user: "David Smith", lawyer: "Robert Vance", amount: "$300", time: "1 day ago", status: "Paid" },
        { id: 4, type: "signup", user: "TechCorp Inc.", role: "Client", time: "1 day ago", status: "New" },
    ];

    return (
        <div className="flex flex-col gap-6 w-full max-w-6xl">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#0A2519]">Welcome back, Admin</h1>
                <p className="text-gray-500 mt-1 text-sm md:text-base">Here is what is happening on LegalEase today.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Right Column: Quick Actions & Status (Takes up 1/3 width) */}
                <div className="flex flex-col gap-6">

                    {/* System Status Card */}
                    <Card className="p-6 bg-[#0A2519] shadow-sm rounded-2xl text-white">
                        <h2 className="text-lg font-bold mb-4">System Status</h2>
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-300">Database connection</span>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                                    <span className="text-sm font-medium text-success">Healthy</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-300">Stripe Payments</span>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                                    <span className="text-sm font-medium text-success">Active</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                </div>
            </div>
        </div>
    );
}
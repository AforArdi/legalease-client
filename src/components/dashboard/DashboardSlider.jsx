"use client";

import { usePathname } from "next/navigation";
import { Link, Button, Drawer } from "@heroui/react";
import {
    LayoutHeader,
    PersonPlus,
    PersonGear,
    Persons,
    CreditCard,
    Bars,
    CommentDot,
    DatabaseMagnifier
} from "@gravity-ui/icons";

const dashboardItems = {
    lawyer: [
        { icon: LayoutHeader, label: "Overview", link: "/dashboard/lawyer" },
        { icon: PersonPlus, label: "Hiring History", link: "/dashboard/lawyer/hiring-history" },
        { icon: PersonGear, label: "Manage Legal Profile", link: "/dashboard/lawyer/manage-legal-profile" },
    ],
    client: [
        { icon: LayoutHeader, label: "Overview", link: "/dashboard/user" },
        { icon: PersonPlus, label: "Hiring History", link: "/dashboard/user/hiring-history" },
        { icon: PersonGear, label: "Update Profile", link: "/dashboard/user/update-profile" },
        { icon: CommentDot, label: "Comments", link: "/dashboard/user/comments" },
    ],
    admin: [
        { icon: LayoutHeader, label: "Overview", link: "/dashboard/admin" },
        { icon: Persons, label: "User Management", link: "/dashboard/admin/manage-users" },
        { icon: CreditCard, label: "Transactions", link: "/dashboard/admin/all-transactions" },
        { icon: DatabaseMagnifier, label: "Analytics", link: "/dashboard/admin/analytics" },
    ],
};

export default function DashboardSlider({ role }) {
    const pathname = usePathname();
    const navItems = dashboardItems[role] || dashboardItems.client;

    const renderLinks = () => (
        <nav className="flex flex-col gap-2 mt-6">
            {navItems.map((item) => {
                const isActive = pathname === item.link;
                return (
                    <Link
                        key={item.label}
                        href={item.link}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive
                            ? "bg-[#0A2519] text-white"
                            : "text-gray-600 hover:bg-[#EAECE8] hover:text-[#0A2519]"
                            }`}
                    >
                        <item.icon className={`size-5 ${isActive ? "text-white" : "text-gray-500"}`} />
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <>
            {/* Desktop Sidebar (Persistent) */}
            <aside className="hidden md:flex flex-col w-64 min-h-[calc(100vh-80px)] border-r border-gray-200 bg-[#F9F9F9] px-4 py-6 shrink-0">
                <div className="flex items-center gap-3">
                    <span className="text-xl">
                        {role ? role.charAt(0).toUpperCase() + role.slice(1).toLowerCase() + ' ' : ''}Dashboard
                    </span>
                </div>
                {renderLinks()}
            </aside>

            {/* Mobile Drawer (Hamburger) */}
            <div className="md:hidden w-full flex items-center p-4 border-b border-gray-200 bg-[#F9F9F9]">
                <Drawer>
                    <Button variant="bordered" className="border-gray-300">
                        <Bars />
                        Menu
                    </Button>
                    <Drawer.Backdrop>
                        <Drawer.Content placement="left" className="bg-[#F9F9F9]">
                            <Drawer.Dialog>
                                <Drawer.CloseTrigger />
                                <Drawer.Header>
                                    <Drawer.Heading className="text-xl font-bold text-[#0A2519]">
                                        {role ? role.charAt(0).toUpperCase() + role.slice(1).toLowerCase() + ' ' : ''}Dashboard
                                    </Drawer.Heading>
                                </Drawer.Header>
                                <Drawer.Body>
                                    {renderLinks()}
                                </Drawer.Body>
                            </Drawer.Dialog>
                        </Drawer.Content>
                    </Drawer.Backdrop>
                </Drawer>
            </div>
        </>
    );
}
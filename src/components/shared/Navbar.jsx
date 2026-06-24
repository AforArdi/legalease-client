"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Link, Button, Avatar, Dropdown, Label, Input } from "@heroui/react";
import UserProfileDropdown from "../utils/UserProfileDropdown";
import { authClient } from "@/lib/auth-client";
import { getFreshUser } from "@/lib/api/core/getUserSession";
import { Magnifier } from '@gravity-ui/icons';
import { motion } from "framer-motion";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/lawyers", label: "Browse Lawyers" },
];

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, isPending, error, } = authClient.useSession();
    const [dbUser, setDbUser] = useState(null);

    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (session?.user) {
            getFreshUser().then((freshUser) => {
                if (freshUser) {
                    setDbUser(freshUser);
                }
            });
        }
    }, [session?.user]);

    const user = dbUser || session?.user;

    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (searchQuery.trim()) {
                router.push(`/lawyers?search=${encodeURIComponent(searchQuery.trim())}`);
                setIsSearchExpanded(false);
                setIsMobileMenuOpen(false);
            }
        }
    };

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
            <header className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                {/* Left Side: Logo */}
                <div className="flex items-center gap-3">
                    <Link href="/" className="font-bold text-2xl text-foreground">
                        LegalEase
                    </Link>
                </div>

                {/* Middle: Links (Desktop) */}
                <ul className="hidden lg:flex items-center gap-2">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`relative z-0 px-4 py-2 font-medium transition-colors rounded-full ${isActive ? "text-white" : "text-foreground hover:text-primary"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-active-indicator"
                                            className="absolute inset-0 bg-black rounded-full -z-10"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Right Side: Search, Auth & Profile, Mobile Menu */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Expandable Search (Visible on all screens) */}
                    <motion.div
                        initial={false}
                        animate={{ width: isSearchExpanded ? "auto" : 40 }}
                        className="flex items-center justify-end overflow-hidden h-10"
                    >
                        {isSearchExpanded ? (
                            <div className="w-40 sm:w-48 lg:w-64 shrink-0 relative">
                                {/* If using a standard/custom Input, you might need to handle the icon positioning manually */}
                                <Magnifier className="absolute left-3 top-1/2 -translate-y-1/2 text-default-400 w-4 h-4 z-10" />

                                <Input
                                    name="search"
                                    type="search"
                                    placeholder="Search lawyer..."
                                    // Merged the inputWrapper classes into the main className
                                    className="w-full pl-10 data-[focus=true]:!ring-0 data-[focus=true]:!border-transparent focus-within:!ring-0"
                                    aria-label="Search lawyers"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleSearchSubmit}
                                    autoFocus
                                    onBlur={() => {
                                        if (!searchQuery) setIsSearchExpanded(false);
                                    }}
                                // startContent removed, as standard components don't support it
                                />
                            </div>
                        ) : (
                            <Button
                                isIconOnly
                                variant="light"
                                radius="full"
                                onClick={() => setIsSearchExpanded(true)}
                                aria-label="Open search"
                                className="min-w-10 w-10 h-10 flex-shrink-0"
                            >
                                <Magnifier className="text-foreground" />
                            </Button>
                        )}
                    </motion.div>

                    {/* Auth & Profile (Desktop Only) */}
                    <div className="hidden lg:flex items-center gap-4">
                        {!session ? (
                            <>
                                <Link href="/auth/login">
                                    <Button variant="ghost">Login</Button>
                                </Link>
                                <Link href="/auth/register">
                                    <Button color="primary" className={'rounded-md'}>Get Started</Button>
                                </Link>
                            </>
                        ) : (
                            <UserProfileDropdown user={user} />
                        )}
                    </div>

                    {/* Mobile Menu Toggle (Hamburger) */}
                    <div className="flex lg:hidden items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-foreground p-2 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Content */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-16 left-0 w-full bg-background border-b border-separator shadow-lg flex flex-col py-4 px-6 gap-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`font-medium transition-colors text-lg ${isActive ? "text-primary" : "text-foreground hover:text-primary"
                                    }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        );
                    })}

                    <div className="h-px w-full bg-separator my-2"></div>

                    {!session ? (
                        <div className="flex flex-col gap-4">
                            <Link href="/auth/login" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start">Login</Button>
                            </Link>
                            <Link href="/auth/register" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button color="primary" className="w-full justify-start">Get Started</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="mt-2 flex items-center justify-between">
                            <span className="font-medium text-foreground">Profile</span>
                            <UserProfileDropdown user={user} />
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
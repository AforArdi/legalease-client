"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Link, Button, Avatar, Dropdown, Label } from "@heroui/react";
import UserProfileDropdown from "../utils/UserProfileDropdown";
import { authClient } from "@/lib/auth-client";
import { getFreshUser } from "@/lib/api/core/getUserSession";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { data: session, isPending, error, } = authClient.useSession();
    const [dbUser, setDbUser] = useState(null);

    useEffect(() => {
        if (session?.user?.email) {
            getFreshUser(session.user.email).then((freshUser) => {
                if (freshUser) {
                    setDbUser(freshUser);
                }
            });
        }
    }, [session?.user?.email]);

    const user = dbUser || session?.user;

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
            <header className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
                {/* Left Side: Logo */}
                <div className="flex items-center gap-3">
                    <Link href="/" className="font-bold text-2xl text-foreground">
                        LegalEase
                    </Link>
                </div>

                {/* Middle: Links (Desktop) */}
                <ul className="hidden md:flex items-center gap-6">
                    <li>
                        <Link
                            href="/"
                            className={`font-medium transition-colors ${pathname === "/" ? "text-primary" : "text-foreground hover:text-primary"
                                }`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/lawyers"
                            className={`font-medium transition-colors ${pathname === "/lawyers" ? "text-primary" : "text-foreground hover:text-primary"
                                }`}
                        >
                            Browse Lawyers
                        </Link>
                    </li>
                </ul>

                {/* Right Side: Auth & Profile (Desktop) */}
                <div className="hidden md:flex items-center gap-4">
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
                <div className="flex md:hidden items-center">
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
            </header>

            {/* Mobile Menu Content */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-separator shadow-lg flex flex-col py-4 px-6 gap-4">
                    <Link
                        href="/"
                        className={`font-medium transition-colors text-lg ${pathname === "/" ? "text-primary" : "text-foreground hover:text-primary"
                            }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/lawyers"
                        className={`font-medium transition-colors text-lg ${pathname === "/lawyers" ? "text-primary" : "text-foreground hover:text-primary"
                            }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Browse Lawyers
                    </Link>

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
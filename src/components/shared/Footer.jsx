'use client'
import { Link, Button, Input } from "@heroui/react";
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="w-full bg-background border-t border-separator pt-16 pb-8 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* Brand and Description */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-xl text-foreground">LegalEase</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                            The premium marketplace for vetted legal professionals. Structured, secure, and precise.
                        </p>
                    </div>

                    {/* Directory Links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground">Directory</h4>
                        <ul className="flex flex-col gap-3">
                            <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Corporate Law</Link></li>
                            <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Intellectual Property</Link></li>
                            <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Real Estate</Link></li>
                            <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Litigation</Link></li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground">Quick Links</h4>
                        <ul className="flex flex-col gap-3">
                            <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
                            <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
                            <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Subscribe */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground">Subscribe</h4>
                        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                            <div className="flex gap-2">
                                <Input
                                    type="email"
                                    placeholder="Enter email"
                                    className="max-w-full"
                                    aria-label="Email for newsletter"
                                />
                                <Button type="submit" className="font-medium bg-foreground text-background">JOIN</Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-separator flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        &copy; 2026 LEGALEASE LLC. DOC-REF: 994-A
                    </p>
                    <div className="flex items-center gap-4">
                        {/* LinkedIn */}
                        <Link href="https://www.linkedin.com/in/mohammad-ardi" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                            <FaLinkedin />
                        </Link>
                        {/* Facebook */}
                        <Link href="https://www.facebook.com/miftahulislamardi" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Facebook">
                            <FaFacebook />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
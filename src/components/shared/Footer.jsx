'use client'
import { Link, Button, Input } from "@heroui/react";

const Footer = () => {
    return (
        <footer className="w-full bg-background border-t border-separator pt-16 pb-8 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* Brand and Description */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            {/* SVG Scales Logo */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
                                <path d="M12 3v18" />
                                <path d="M3 7h18" />
                                <path d="M5 7v4a2 2 0 0 0 4 0V7" />
                                <path d="M15 7v4a2 2 0 0 0 4 0V7" />
                                <path d="M9 21h6" />
                            </svg>
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
                        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </Link>
                        {/* Twitter */}
                        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
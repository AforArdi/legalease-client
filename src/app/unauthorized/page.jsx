import Link from "next/link";
import { Button } from "@heroui/react";
import { ShieldAlert, Home } from "lucide-react";

const UnauthorizedPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/10 dark:bg-red-500/5 rounded-full blur-3xl" />
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-lg w-full flex flex-col items-center text-center p-8 md:p-12 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[2.5rem] shadow-2xl">
                <div className="w-24 h-24 mb-6 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center text-red-500 dark:text-red-400 shadow-inner">
                    <ShieldAlert size={48} strokeWidth={1.5} />
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tight">
                    Access Denied
                </h1>

                <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-md leading-relaxed">
                    You don't have the required permissions to view this page. Please contact your administrator if you believe this is a mistake.
                </p>

                <Link href={'/'}>
                    <Button
                        color="danger"
                        variant="primary"
                        size="lg"
                        className="w-full sm:w-auto px-8 font-medium text-white shadow-red-500/30"
                        startContent={<Home size={20} />}
                    >
                        Return to Home Page
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
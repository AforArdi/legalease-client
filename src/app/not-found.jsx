import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center flex-1 min-h-[60vh] text-center px-4">
            <div className="w-full max-w-md mx-auto">
                <h1 className="text-6xl font-extrabold text-black mb-2">
                    404
                </h1>
                <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
                    Page Not Found
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6 leading-relaxed">
                    Oops! The page you are looking for doesn't exist or has been moved.
                </p>
                <Link href="/">
                    <button className="group relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-bold text-black bg-white border border-black rounded-sm shadow-lg hover:bg-black hover:text-white transition-all duration-300">
                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-black group-hover:translate-x-0"></span>
                        <span className="relative z-10 flex items-center gap-2">
                            Return to Homepage
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </button>
                </Link>
            </div>
        </div>
    );
}
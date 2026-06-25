"use client";

import { HashLoader } from "react-spinners";

export default function GlobalLoading() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <HashLoader color="#0A2519" size={60} speedMultiplier={1} />
        </div>
    );
}
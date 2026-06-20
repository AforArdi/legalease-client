import { getLawyers } from "@/lib/api/lawyer/lawyer";
import LawyerCard from "@/components/lawyer/LawyerCard";
import LawyerCardSkeleton from "@/components/lawyer/LawyerCardSkeleton";
import { Suspense } from "react";

const LawyersGrid = async () => {
    try {
        const allLawyer = await getLawyers();
        if (!allLawyer || allLawyer.length === 0) {
            return <div className="text-gray-500 py-10">No lawyers found.</div>;
        }
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allLawyer.map((lawyer) => (
                    <LawyerCard key={lawyer._id} lawyer={lawyer} />
                ))}
            </div>
        );
    } catch (error) {
        return (
            <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-100">
                Failed to load lawyers. Please check your connection and try again later.
            </div>
        );
    }
};

const BrowseLawyersPage = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-16">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0A2519] mb-8">
                Browse Lawyers
            </h1>

            <Suspense fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => <LawyerCardSkeleton key={i} />)}
                </div>
            }>
                <LawyersGrid />
            </Suspense>
        </div>
    );
};

export default BrowseLawyersPage;
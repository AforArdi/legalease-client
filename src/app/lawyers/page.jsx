import { getLawyers } from "@/lib/api/lawyer/lawyer";
import LawyerCard from "@/components/lawyer/LawyerCard";
import LawyerCardSkeleton from "@/components/lawyer/LawyerCardSkeleton";
import ServerPagination from "@/components/shared/ServerPagination";
import FilterPanel from "@/components/utils/FilterPanel";
import SearchLawyer from "@/components/utils/SearchLawyer";
import { Suspense } from "react";

const LawyersGrid = async ({ page, search, category, status }) => {
    try {
        const params = { page, limit: 8 };
        if (search) params.search = search;
        if (category) params.category = category;
        if (status) params.status = status;

        const response = await getLawyers(params);
        // The API returns { data, totalPages, currentPage } if page is requested
        const allLawyer = response.data || [];
        const totalPages = response.totalPages || 1;

        if (!allLawyer || allLawyer.length === 0) {
            return <div className="text-gray-500 py-10">No lawyers found.</div>;
        }
        return (
            <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                    {allLawyer.map((lawyer) => (
                        <LawyerCard key={lawyer._id} lawyer={lawyer} />
                    ))}
                </div>
                <ServerPagination totalPages={totalPages} currentPage={page} />
            </>
        );
    } catch (error) {
        return (
            <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-100">
                Failed to load lawyers. Please check your connection and try again later.
            </div>
        );
    }
};

const BrowseLawyersPage = async ({ searchParams }) => {
    const { page, search, category, status } = await searchParams;
    const currentPage = parseInt(page) || 1;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-16">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0A2519] mb-8">
                Browse Lawyers
            </h1>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                <FilterPanel />
                <SearchLawyer />
            </div>

            <Suspense fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => <LawyerCardSkeleton key={i} />)}
                </div>
            }>
                <LawyersGrid page={currentPage} search={search} category={category} status={status} />
            </Suspense>
        </div>
    );
};

export default BrowseLawyersPage;
import { getTopLawyers } from "@/lib/api/lawyer/lawyer";
import LawyerCard from "../lawyer/LawyerCard";
import LawyerCardSkeleton from "../lawyer/LawyerCardSkeleton";
import { Suspense } from "react";

const TopLawyersGrid = async () => {
    let topLawyers = [];
    try {
        topLawyers = await getTopLawyers();
    } catch (e) {
        topLawyers = [];
    }

    if (!topLawyers || topLawyers.length === 0) {
        return <div className="text-gray-500 py-4 text-center w-full">No top lawyers available at the moment.</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
            {topLawyers.map((lawyer, idx) => (
                <LawyerCard key={lawyer._id || idx} lawyer={lawyer} />
            ))}
        </div>
    );
};

const TopLegalExperts = () => {
    return (
        <section className="w-full mx-auto px-4 lg:px-8 py-16">
            <div className="flex flex-col md:flex-row md:items-end justify-center mb-10 gap-4">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0A2519] mb-4">
                        Top Legal Experts
                    </h2>
                    <p className="text-gray-600 max-w-2xl">
                        Meet our most hired lawyers across the country.
                    </p>
                </div>
            </div>

            <Suspense fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
                    {[...Array(3)].map((_, i) => <LawyerCardSkeleton key={i} />)}
                </div>
            }>
                <TopLawyersGrid />
            </Suspense>
        </section>
    );
};

export default TopLegalExperts;
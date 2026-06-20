import { getLawyers } from "@/lib/api/lawyer/lawyer";
import LawyerCard from "../lawyer/LawyerCard";
import LawyerCardSkeleton from "../lawyer/LawyerCardSkeleton";
import Link from "next/link";
import { Suspense } from "react";

const FeaturedLawyersGrid = async () => {
    let featuredLawyers = [];
    try {
        featuredLawyers = await getLawyers({ random: true, limit: 6 });
    } catch (e) {
        // Fallback gracefully on error
        featuredLawyers = [];
    }

    if (!featuredLawyers || featuredLawyers.length === 0) {
        return <div className="text-gray-500 py-4">No featured lawyers available at the moment.</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredLawyers.map((lawyer, idx) => (
                <LawyerCard key={lawyer._id || idx} lawyer={lawyer} />
            ))}
        </div>
    );
};

const FeaturedLawyers = () => {
    return (
        <section className="w-full mx-auto px-4 lg:px-8 py-16">
            <div className="flex flex-col md:flex-row md:items-end justify-center mb-10 gap-4">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0A2519] mb-4">
                        Featured Legal Experts
                    </h2>
                    <p className="text-gray-600 max-w-2xl">
                        Connect with top attorneys known for outstanding results.
                    </p>
                </div>
            </div>

            <Suspense fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => <LawyerCardSkeleton key={i} />)}
                </div>
            }>
                <FeaturedLawyersGrid />
            </Suspense>
        </section>
    );
};

export default FeaturedLawyers;
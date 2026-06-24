import Link from "next/link";
import Image from "next/image";
import { Card, Button, Skeleton } from "@heroui/react";

const LawyerCard = ({ lawyer, isLoading }) => {
    // 1. Render the HeroUI Standalone Skeleton matching the card's exact dimensions
    if (isLoading || !lawyer) {
        return (
            <Card className="p-0 h-full border border-gray-100 shadow-sm rounded-2xl overflow-hidden bg-white">
                <div className="flex flex-col h-full w-full">
                    {/* Skeleton Image Section */}
                    <div className="relative w-full h-72 shrink-0 bg-[#F3F5F2]">
                        <Skeleton className="w-full h-full rounded-none" />

                        {/* Skeleton Status Badge */}
                        <div className="absolute top-4 right-4 z-10">
                            <Skeleton className="h-7 w-24 rounded-full" />
                        </div>
                    </div>

                    {/* Skeleton Content Section */}
                    <div className="flex flex-col grow px-6 pt-6 pb-2 space-y-3">
                        <Skeleton className="h-3 w-1/3 rounded-lg" />
                        <Skeleton className="h-6 w-3/4 rounded-lg" />
                    </div>

                    {/* Empty flex-grow area to push footer down */}
                    <div className="grow px-6"></div>

                    {/* Skeleton Footer Section */}
                    <div className="px-6 py-5 border-t border-gray-100 flex items-center justify-between bg-gray-50/50 mt-auto flex-shrink-0">
                        <div className="flex flex-col space-y-2">
                            <Skeleton className="h-2 w-20 rounded-lg" />
                            <Skeleton className="h-5 w-16 rounded-lg" />
                        </div>
                        <Skeleton className="h-8 w-32 rounded-full" />
                    </div>
                </div>
            </Card>
        );
    }

    // 2. Render the actual interactive content once loaded
    const { _id, name, image, category, fee, status } = lawyer;

    return (
        <Card className="p-0 h-full border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-2xl overflow-hidden group bg-white">
            <Link href={`/lawyers/${_id || ''}`} className="flex flex-col h-full w-full">

                {/* Image Section */}
                <div className="relative w-full h-72 overflow-hidden bg-[#F3F5F2] shrink-0">
                    <Image
                        src={image || "/placeholder-lawyer.jpg"} // Ensure a valid fallback URL
                        alt={name || "Lawyer"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 z-10">
                        <span className={`px-4 py-1.5 text-xs font-bold tracking-wide rounded-full shadow-sm backdrop-blur-md ${status?.toLowerCase() === 'available'
                                ? 'bg-[#e2f0e9]/95 text-[#0A2519]'
                                : 'bg-white/95 text-gray-800'
                            }`}>
                            {status || "Available"}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col grow px-6 pt-6 pb-2">
                    <span className="text-[11px] uppercase tracking-widest text-[#0A2519] font-bold opacity-70 block mb-1">
                        {category || "Criminal"}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                        {name || "Legal Expert"}
                    </h3>
                </div>

                {/* Empty flex-grow area to push footer down */}
                <div className="grow px-6"></div>

                {/* Footer Section */}
                <div className="px-6 py-5 border-t border-gray-100 flex items-center justify-between bg-gray-50/50 mt-auto flex-shrink-0 transition-colors duration-300 group-hover:bg-[#f8faf8]">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block mb-1">
                            Consultation Fee
                        </span>
                        <span className="text-lg font-extrabold text-[#0A2519] block">
                            ${fee || 0}
                        </span>
                    </div>

                    {/* HeroUI Button Implementation */}
                    <Button
                        variant="bordered"
                        radius="full"
                        size="sm"
                        className="border-[#0A2519]/20 text-[#0A2519] font-semibold bg-transparent hover:bg-[#0A2519] hover:text-white hover:border-[#0A2519] transition-all duration-300 px-4"
                    >
                        View Profile &rarr;
                    </Button>
                </div>

            </Link>
        </Card>
    );
};

export default LawyerCard;
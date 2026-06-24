import { Card, Skeleton } from "@heroui/react";

const LawyerCardSkeleton = () => {
    return (
        <Card className="p-0 h-full border border-gray-100 shadow-sm rounded-2xl overflow-hidden bg-white">
            <div className="flex flex-col h-full w-full">
                {/* Image Skeleton */}
                <div className="relative w-full h-72 overflow-hidden bg-default-200 shrink-0">
                    <Skeleton className="w-full h-full rounded-none" />

                    {/* Status Badge Skeleton */}
                    <div className="absolute top-4 right-4 z-10">
                        <Skeleton className="w-20 h-6 rounded-full" />
                    </div>
                </div>

                {/* Content Section Skeleton */}
                <div className="flex flex-col grow px-6 pt-6 pb-2 space-y-3">
                    <Skeleton className="h-3 w-2/5 rounded-lg" />
                    <Skeleton className="h-5 w-4/5 rounded-lg" />
                </div>

                <div className="grow px-6"></div>

                {/* Footer Section Skeleton */}
                <div className="px-6 py-5 border-t border-gray-100 flex items-center justify-between bg-gray-50/50 mt-auto flex-shrink-0">
                    <div className="flex flex-col space-y-2">
                        <Skeleton className="h-2 w-24 rounded-lg" />
                        <Skeleton className="h-6 w-16 rounded-lg" />
                    </div>

                    {/* Button Skeleton */}
                    <Skeleton className="w-32 h-8 rounded-full" />
                </div>
            </div>
        </Card>
    );
};

export default LawyerCardSkeleton;

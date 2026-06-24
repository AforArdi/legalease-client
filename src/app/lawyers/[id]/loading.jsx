import { Skeleton } from "@heroui/react";

export default function LawyerDetailsSkeleton() {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 lg:px-8 py-16">
            <div className="flex flex-col md:flex-row gap-12">
                {/* Left Sidebar Skeleton */}
                <div className="w-full md:w-1/3 flex flex-col">
                    <Skeleton className="w-full h-80 md:h-100 mb-6 rounded-none bg-gray-100" />
                    
                    <Skeleton className="h-8 w-3/4 mb-3 rounded-md" />
                    <Skeleton className="h-4 w-1/2 mb-8 rounded-md" />

                    <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-gray-200 py-6 mb-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex flex-col">
                                <Skeleton className="h-2 w-1/2 mb-2 rounded-md" />
                                <Skeleton className="h-4 w-3/4 rounded-md" />
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3">
                        <Skeleton className="h-14 w-full rounded-none" />
                        <Skeleton className="h-14 w-full rounded-none" />
                    </div>
                </div>

                {/* Right Content Area Skeleton */}
                <div className="w-full md:w-2/3 flex flex-col pt-2">
                    <div className="border-b border-gray-200 pb-4 mb-6">
                        <Skeleton className="h-8 w-1/2 rounded-md" />
                    </div>
                    
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-full rounded-md" />
                        <Skeleton className="h-4 w-11/12 rounded-md" />
                        <Skeleton className="h-4 w-full rounded-md" />
                        <Skeleton className="h-4 w-4/5 rounded-md" />
                        <div className="pt-4">
                            <Skeleton className="h-4 w-full rounded-md" />
                            <Skeleton className="h-4 w-5/6 rounded-md" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

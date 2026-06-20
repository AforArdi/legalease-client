import { Card, Skeleton } from "@heroui/react";

const LawyerCardSkeleton = () => {
    return (
        <Card className="h-full border border-gray-100 shadow-sm rounded-xl overflow-hidden">
            {/* Image Skeleton */}
            <Skeleton className="w-full h-64 rounded-none" />
            
            <Card.Header className="flex flex-col items-start px-6 pt-6 pb-2">
                <Skeleton className="h-3 w-2/5 rounded-lg mb-4" />
                <Skeleton className="h-5 w-4/5 rounded-lg" />
            </Card.Header>
            
            <Card.Content className="flex-grow px-6">
            </Card.Content>

            <Card.Footer className="px-6 py-5 border-t border-gray-100 flex items-center justify-between bg-white mt-auto">
                <div className="flex flex-col w-1/2">
                    <Skeleton className="h-2 w-3/4 rounded-lg mb-3" />
                    <Skeleton className="h-4 w-1/2 rounded-lg" />
                </div>
                <Skeleton className="h-4 w-1/4 rounded-lg" />
            </Card.Footer>
        </Card>
    );
};

export default LawyerCardSkeleton;

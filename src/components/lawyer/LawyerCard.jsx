import Link from "next/link";
import { Card } from "@heroui/react";

const LawyerCard = ({ lawyer }) => {
    const { _id, name, image, category, fee, status } = lawyer || {};

    return (
        <Card className="h-full border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-xl overflow-hidden group">
            <Link href={`/lawyers/${_id || ''}`} className="flex flex-col h-full w-full">
                {/* Image section at the top of the card */}
                <div className="relative w-full h-64 overflow-hidden bg-[#F3F5F2] flex-shrink-0">
                    <img
                        src={image || "https://via.placeholder.com/400x500?text=Lawyer"}
                        alt={name || "Lawyer"}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 z-10">
                        <span className={`px-3 py-1 text-xs font-bold rounded-sm shadow-sm ${status?.toLowerCase() === 'available' ? 'bg-[#e2f0e9] text-[#0A2519]' : 'bg-gray-100 text-gray-800'
                            }`}>
                            {status || "Available"}
                        </span>
                    </div>
                </div>

                <Card.Header className="flex flex-col items-start px-6 pt-6 pb-2">
                    <Card.Description className="text-xs uppercase tracking-widest text-[#0A2519] font-bold mb-2 opacity-80">
                        {category || "Criminal"}
                    </Card.Description>
                    <Card.Title className="text-xl font-bold text-gray-900 line-clamp-1">
                        {name || "Legal Expert"}
                    </Card.Title>
                </Card.Header>

                <Card.Content className="flex-grow px-6">
                    {/* Empty content area to satisfy the anatomy and allow flex-grow to push footer down */}
                </Card.Content>

                <Card.Footer className="px-6 py-5 border-t border-gray-100 flex items-center justify-between bg-white mt-auto flex-shrink-0">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Consultation Fee</span>
                        <span className="text-lg font-bold text-[#0A2519]">${fee || 0}</span>
                    </div>
                    <span className="text-sm font-semibold text-[#0A2519] group-hover:underline">
                        View Profile &rarr;
                    </span>
                </Card.Footer>
            </Link>
        </Card>
    );
};

export default LawyerCard;
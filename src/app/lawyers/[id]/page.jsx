import { getLawyerById } from "@/lib/api/lawyer/lawyer";
import { getUserSession } from "@/lib/api/core/getUserSession";
import HireLawyerButton from "@/components/lawyer/HireLawyerButton";

const LawyerDetailsPage = async ({ params }) => {
    const { id: lawyerId } = await params;
    const lawyer = await getLawyerById(lawyerId);
    const user = await getUserSession();

    // console.log(lawyer);

    // const handleConsultationRequest = async () => {

    // }

    if (!lawyer) {
        return (
            <div className="w-full max-w-6xl mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold text-gray-800">Lawyer not found</h1>
                <p className="text-gray-500 mt-2">The lawyer you are looking for does not exist or has been removed.</p>
            </div>
        );
    }

    const { _id, name, image, category, fee, status, bio, joined } = lawyer;

    // Format date if joined exists
    let joinedText = "RECENTLY";
    if (joined) {
        try {
            const date = new Date(joined);
            joinedText = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
        } catch (e) { }
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-4 lg:px-8 py-16">
            <div className="flex flex-col md:flex-row gap-12">

                {/* Left Sidebar */}
                <div className="w-full md:w-1/3 flex flex-col">
                    <div className="w-full h-80 md:h-[400px] overflow-hidden bg-[#F3F5F2] mb-6 border border-gray-100">
                        <img
                            src={image || "https://via.placeholder.com/400x500?text=Lawyer"}
                            alt={name || "Lawyer"}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <h1 className="text-3xl font-bold text-[#0A2519] mb-1">
                        {name || "Legal Expert"}
                    </h1>
                    <p className="text-sm font-semibold text-[#0A2519] opacity-80 mb-8">
                        {category || "General Practice Law"}
                    </p>

                    <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-gray-200 py-6 mb-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Consultation</span>
                            <span className="text-sm font-bold text-[#0A2519]">${fee || 0}/HR</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Joined</span>
                            <span className="text-sm font-bold text-[#0A2519] uppercase">{joinedText}</span>
                        </div>
                        <div className="col-span-2 flex flex-col">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Status</span>
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${status?.toLowerCase() === 'available' ? 'bg-[#3b8c5a]' : 'bg-gray-400'}`}></span>
                                <span className="text-sm font-bold text-[#0A2519] uppercase">
                                    {status?.toLowerCase() === 'available' ? 'Accepting Cases' : 'Busy'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <HireLawyerButton lawyer={lawyer} user={user} />
                        <button className="w-full bg-transparent border border-[#0A2519] text-[#0A2519] font-bold py-4 rounded-none hover:bg-gray-50 transition-colors">
                            Send Message
                        </button>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="w-full md:w-2/3 flex flex-col pt-2">
                    <div className="border-b border-gray-200 pb-4 mb-6 flex items-baseline gap-4">
                        <h2 className="text-2xl font-bold text-[#0A2519]">
                            Professional Summary
                        </h2>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                            REF: BIO-{_id?.substring(0, 4).toUpperCase() || '01'}
                        </span>
                    </div>

                    <div className="text-gray-700 leading-relaxed space-y-4">
                        {bio ? (
                            <p>{bio}</p>
                        ) : (
                            <>
                                <p>
                                    {name || "This lawyer"} is a distinguished practitioner in {category || "general law"}, with extensive experience navigating complex regulatory environments. They have consistently delivered strategic counsel to individuals and high-growth businesses alike.
                                </p>
                                <p>
                                    Known for their meticulous attention to detail and robust negotiation strategies, their approach combines rigorous legal scholarship with pragmatic business acumen.
                                </p>
                            </>
                        )}
                    </div>

                    {/* Authenticated Comments Section */}
                    <div className="mt-16">
                        <h2 className="text-xl font-bold text-[#0A2519] mb-6">Client Reviews</h2>
                        {!user ? (
                            <div className="bg-gray-50 p-6 text-center border border-gray-200">
                                <p className="text-sm text-gray-600">Please log in to view and post reviews.</p>
                            </div>
                        ) : user?.role === "lawyer" ? (
                            <div className="bg-[#F3F5F2] p-6 border border-gray-100">
                                <p className="text-sm text-gray-600 italic">As a lawyer, you are viewing these reviews in read-only mode.</p>
                            </div>
                        ) : (
                            <div className="bg-[#F3F5F2] p-6 border border-gray-100">
                                <p className="text-sm text-gray-600 italic">No reviews yet. Be the first to leave a comment!</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LawyerDetailsPage;
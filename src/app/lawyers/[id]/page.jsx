import { getLawyerById } from "@/lib/api/lawyer/lawyer";

const LawyerDetailsPage = async ({ params }) => {
    const lawyerId = params.id;
    const lawyer = await getLawyerById(lawyerId);
    // console.log(lawyer);

    return (
        <div>
            Lawyers details page
        </div>
    );
};

export default LawyerDetailsPage;
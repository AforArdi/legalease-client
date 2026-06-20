import { getUserSession } from "@/lib/api/core/getUserSession";
import HiringRequestsTable from "@/components/lawyer/HiringRequestsTable";

export const metadata = {
  title: "Hiring Requests | LegalEase",
};

export default async function LawyerHiringHistoryPage() {
  const sessionUser = await getUserSession();

  return (
    <div className="p-6 md:p-10 w-full max-w-6xl mx-auto">
      <HiringRequestsTable sessionUser={sessionUser} />
    </div>
  );
}
import { getUserSession } from "@/lib/api/core/getUserSession";
import UserHiringHistoryTable from "@/components/user/UserHiringHistoryTable";

export const metadata = {
  title: "Hiring History | LegalEase",
};

export default async function UserHiringHistoryPage() {
  const sessionUser = await getUserSession();

  return (
    <div className="p-6 md:p-10 w-full max-w-6xl mx-auto">
      <UserHiringHistoryTable sessionUser={sessionUser} />
    </div>
  );
}
import ManageProfileForm from "@/components/lawyer/ManageProfileForm";
import { getUserSession } from "@/lib/api/core/getUserSession";
import { getLawyers } from "@/lib/api/lawyer/lawyer";

export default async function ManageLegalProfilePage() {
  const sessionUser = await getUserSession();

  const email = sessionUser?.email;
  let initialData = null;

  if (email) {
    try {
      const data = await getLawyers({ email });
      if (data && data.length > 0) {
        initialData = data[0];
      }
    } catch (error) {
      console.error("Failed to fetch lawyer profile:", error);
    }
  }

  return <ManageProfileForm initialData={initialData} sessionUser={sessionUser} />;
}
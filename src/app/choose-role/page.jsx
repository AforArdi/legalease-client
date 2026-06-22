"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { RoleCard } from "@/components/utils/RoleCard";
import { serverMutation } from "@/lib/api/core/server";

export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState("");
  const router = useRouter();

  // Get the current session to identify the user
  const { data: session, isPending } = authClient.useSession();

  const handleRoleSubmit = async () => {
    if (!selectedRole) return;

    if (!session?.user?.email) {
      toast.error("User session not found. Please log in again.");
      return;
    }

    try {
      const { data, error } = await authClient.updateUser({
        role: selectedRole,
      });

      if (data) {
        toast.success(`Successfully registered as a ${selectedRole}!`);
        // Refresh the router cache before redirecting so the server components see the new JWT
        router.refresh();
        
        // Redirect based on role
        if (selectedRole === "lawyer") {
          router.push("/dashboard/lawyer/manage-legal-profile");
        } else {
          router.push("/");
        }
      } else {
        toast.error(error?.message || "Failed to update role");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("An error occurred while updating the role");
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center py-20 min-h-[calc(100vh-80px)] bg-[#F9F9F9]">
      <div className="text-center max-w-2xl px-4 mb-8">
        <h1 className="text-4xl font-bold text-[#0A2519] mb-4">Select Your Designation</h1>
        <p className="text-gray-600">
          Please identify your primary role within the LegalEase registry to proceed with your onboarding.
        </p>
      </div>

      <div className="flex md:flex-row flex-col gap-8 px-4">
        <RoleCard
          value="user"
          selectedValue={selectedRole}
          onSelect={setSelectedRole}
          description="I am looking for legal counsel and expert representation. Access a curated registry of vetted professionals and manage your case dossiers."
          buttonText="Select Client Role"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          }
        >
          Client
        </RoleCard>

        <RoleCard
          value="lawyer"
          selectedValue={selectedRole}
          onSelect={setSelectedRole}
          description="I am a legal professional looking to manage my practice and clients. Utilize archival-grade tools for docket management and client communication."
          buttonText="Select Lawyer Role"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 11H10v-2h4v2zm-2-9c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm4 13h-8v-2h8v2zm0-6h-8v-2h8v2z" />
            </svg>
          }
        >
          Lawyer
        </RoleCard>
      </div>

      <div className="mt-8 px-4 w-full flex justify-center">
        <Button
          color="primary"
          onPress={handleRoleSubmit}
          isDisabled={!selectedRole}
          className="w-full max-w-[400px] bg-[#A48039] hover:bg-[#8e6e30] font-bold text-white rounded-none py-6"
        >
          Complete Registration
        </Button>
      </div>
    </div>
  );
}
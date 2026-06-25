"use client";

import { Button, RadioGroup, Radio, Description } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
// import { serverMutation } from "@/lib/api/core/server";
import { FiUser, FiBriefcase } from "react-icons/fi";

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
      // console.error("Error updating role:", error);
      toast.error("An error occurred while updating the role");
    }
  };

  const roles = [
    {
      value: "user",
      label: "Client",
      icon: <FiUser className="w-6 h-6" />,
      description: "I am looking for legal counsel and expert representation.",
    },
    {
      value: "lawyer",
      label: "Lawyer",
      icon: <FiBriefcase className="w-6 h-6" />,
      description: "I am a legal professional looking to manage my practice.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-[#F9F9F9] px-4 py-16">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0A2519] mb-3">
            Select Your Designation
          </h1>
          <p className="text-gray-500 text-sm">
            Choose your role to get started with LegalEase.
          </p>
        </div>

        <RadioGroup
          value={selectedRole}
          onChange={setSelectedRole}
          className="gap-4"
        >
          {roles.map((role) => (
            <Radio
              key={role.value}
              value={role.value}
              className={`w-full border-2 rounded-none px-6 py-5 cursor-pointer transition-all duration-200 ${selectedRole === role.value
                ? "border-[#0A2519] bg-[#EAECE8]"
                : "border-gray-200 bg-white hover:border-gray-300"
                }`}
            >
              <Radio.Content>
                <Radio.Control className="hidden">
                  <Radio.Indicator />
                </Radio.Control>
                <div className="flex items-center gap-4 w-full">
                  <div
                    className={`w-11 h-11 rounded-sm flex items-center justify-center shrink-0 transition-colors ${selectedRole === role.value
                      ? "bg-[#0A2519] text-white"
                      : "bg-gray-100 text-gray-500"
                      }`}
                  >
                    {role.icon}
                  </div>
                  <div>
                    <span className="text-lg font-semibold text-[#0A2519]">
                      {role.label}
                    </span>
                    <Description className="text-gray-500 text-xs mt-0.5">
                      {role.description}
                    </Description>
                  </div>
                </div>
              </Radio.Content>
            </Radio>
          ))}
        </RadioGroup>

        <Button
          color="primary"
          onPress={handleRoleSubmit}
          isDisabled={!selectedRole}
          className="w-full bg-[#0A2519] hover:bg-[#143d2a] font-semibold text-white rounded-none py-6 mt-8 text-base"
        >
          Complete Registration
        </Button>
      </div>
    </div>
  );
}
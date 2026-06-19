"use client";

import { RadioGroup, Radio, cn, Button } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const RoleCard = (props) => {
  const { children, description, icon, buttonText, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-[#EAECE8] hover:bg-[#E0E3DD] items-stretch justify-start",
          "flex-col w-full max-w-[380px] cursor-pointer border-none transition-all",
          "data-[selected=true]:ring-2 data-[selected=true]:ring-[#0F3523] p-0"
        ),
        labelWrapper: "ml-0 flex-1 w-full",
        control: "hidden", // hide the radio button circle
      }}
      style={{ clipPath: "polygon(0 25px, 25px 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      <div className="flex flex-col h-full w-full">
        <div className="p-8 flex flex-col flex-1">
          <div className="w-12 h-12 bg-[#1B3B2B] text-[#71927F] flex items-center justify-center rounded-sm mb-6 mt-2">
            {icon}
          </div>
          
          <h3 className="text-2xl font-bold text-[#0A2519] mb-4">
            {children}
          </h3>
          
          <p className="text-sm text-gray-700 leading-relaxed mb-8 flex-1">
            {description}
          </p>
        </div>
        
        {/* Bottom Button Area */}
        <div className="w-full bg-[#0A2519] text-white text-center py-4 text-sm font-semibold mt-auto">
          {buttonText}
        </div>
      </div>
    </Radio>
  );
};

export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState("");
  const router = useRouter();

  const handleRoleSubmit = () => {
    console.log("Saving user role as:", selectedRole);
    // You can add redirection logic later when integrating betterauth
  };

  return (
    <div className="flex flex-col gap-6 items-center py-20 min-h-[calc(100vh-80px)] bg-[#F9F9F9]">
      <div className="text-center max-w-2xl px-4 mb-8">
        <h1 className="text-4xl font-bold text-[#0A2519] mb-4">Select Your Designation</h1>
        <p className="text-gray-600">
          Please identify your primary role within the LegalEase registry to proceed with your onboarding.
        </p>
      </div>
      
      <RadioGroup 
        value={selectedRole} 
        onValueChange={setSelectedRole}
        className="flex md:flex-row flex-col gap-8 px-4"
        classNames={{ wrapper: "gap-8" }}
      >
        <RoleCard 
          value="client" 
          description="I am looking for legal counsel and expert representation. Access a curated registry of vetted professionals and manage your case dossiers."
          buttonText="Select Client Role"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          }
        >
          Client
        </RoleCard>
        
        <RoleCard 
          value="lawyer" 
          description="I am a legal professional looking to manage my practice and clients. Utilize archival-grade tools for docket management and client communication."
          buttonText="Select Lawyer Role"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
               <path d="M14 11H10v-2h4v2zm-2-9c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm4 13h-8v-2h8v2zm0-6h-8v-2h8v2z"/>
            </svg>
          }
        >
          Lawyer
        </RoleCard>
      </RadioGroup>

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
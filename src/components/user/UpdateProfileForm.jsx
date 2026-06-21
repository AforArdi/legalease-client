"use client";

import {
  Button,
  Input,
} from "@heroui/react";
import Image from "next/image";
import { uploadImgbb } from "@/lib/action/uploadImgbb";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { updateUserProfile } from "@/lib/api/user/user";

const UpdateProfileForm = ({ user }) => {
  const [profileImage, setProfileImage] = useState(
    user?.image || "https://i.ibb.co/2z3YTpG/phero-logo.jpg"
  );
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      fullName: user?.name || "",
      email: user?.email || "",
    }
  });

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const toastId = toast.loading("Uploading photo...");
    try {
      const res = await uploadImgbb(file);
      setProfileImage(res.url);
      toast.success("Photo uploaded successfully!", { id: toastId });
    } catch (error) {
      toast.error("Failed to upload photo", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!user?.email) return;

    const payload = {
      name: data.fullName,
      email: user.email,
      image: profileImage,
    };

    try {
      await updateUserProfile(payload);
      toast.success("Profile saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save profile changes.");
    }
  };

  return (
    <div className="flex flex-col gap-10 p-6 md:p-10 w-full max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-[#0A2519] mb-2">User Profile Information</h1>
        <p className="text-gray-600 text-sm">Edit Profile Information</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-8 items-start w-full">
        {/* Left Sidebar: Photo */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-6">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-[#0A2519] mb-4 bg-gray-100">
              <Image
                src={profileImage}
                sizes="100vw"
                alt="Profile photo"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-[#0A2519] text-center">{user?.name || "User"}</h3>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              className="hidden"
              accept="image/*"
            />
            <Button
              variant="light"
              size="sm"
              className="mt-4 text-gray-600 hover:text-[#0A2519]"
              onPress={() => fileInputRef.current?.click()}
              isLoading={isUploading}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              Update Photo
            </Button>
          </div>
        </div>

        {/* Right Form: Personal Details */}
        <div className="flex-1 w-full bg-white border-t-2 border-[#A48039] p-8 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-b-xl rounded-tr-xl">
          <h2 className="text-xl font-bold text-[#0A2519] mb-6">Personal Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-medium mb-1 block">Name</label>
              <Input
                {...register("fullName")}
                placeholder={user?.name || 'Your Name'}
                className="w-full px-3 py-2 border border-gray-300 rounded-none bg-white shadow-none focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-medium mb-1 block">
                <div className="flex justify-between items-center w-full">
                  <span>Email Address</span>
                  <span className="text-[10px] text-gray-400 font-mono">{"{Disabled}"}</span>
                </div>
              </label>
              <Input
                {...register("email")}
                placeholder="jane.doe@example.com"
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-none bg-gray-50 text-gray-500 shadow-none focus:outline-none"
              />
            </div>

            <div className="flex justify-end items-center gap-4 col-span-1 md:col-span-2 mt-4">
              <Button variant="light" className="font-medium text-gray-600 hover:text-[#0A2519]">Cancel</Button>
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="font-medium bg-[#A48039] text-white hover:bg-[#8e6e30] rounded-none px-6"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
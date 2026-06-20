"use client";

import {
  Button,
  Chip,
  Select,
  ListBox,
  Label,
  Input,
  TextArea
} from "@heroui/react";
import Image from "next/image";
import { uploadImgbb } from "@/lib/action/uploadImgbb";
import { useForm, Controller } from "react-hook-form";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { updateLawyerProfile } from "@/lib/api/lawyer/lawyer";

export default function ManageProfileForm({ initialData, sessionUser }) {

  const [profileImage, setProfileImage] = useState(
    initialData?.image || sessionUser?.image || "https://i.ibb.co/2z3YTpG/phero-logo.jpg"
  );
  const [isUploading, setIsUploading] = useState(false);
  const [memberSince, setMemberSince] = useState(
    initialData?.createdAt
      ? new Date(initialData.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : "Just Now"
  );
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      // sessionUser?.name ||  -> this was in fullName, for later note
      fullName: initialData?.name || "",
      email: sessionUser?.email || "",
      category: initialData?.category || "",
      status: initialData?.status || "Available",
      bio: initialData?.bio || "",
      experience: initialData?.experience ? parseInt(initialData.experience) : "",
      fee: initialData?.fee || "",
    }
  });

  const watchCategory = watch("category", "Select Category");

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
    console.log(data.fullName);

    if (!sessionUser?.email) return;

    const payload = {
      name: data.fullName,
      email: sessionUser.email,
      image: profileImage,
      category: data.category,
      experience: `${data.experience} Years`,
      bio: data.bio,
      fee: Number(data.fee),
      status: data.status,
    };

    if (memberSince === "Just Now") {
      payload.createdAt = new Date().toISOString();
    }

    try {
      await updateLawyerProfile(payload);
      toast.success("Profile saved successfully!");

      if (payload.createdAt) {
        setMemberSince(new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save profile changes.");
    }
  };

  return (
    <div className="flex flex-col gap-10 p-6 md:p-10 w-full max-w-6xl mx-auto">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-[#0A2519] mb-2">Manage Legal Profile</h1>
        <p className="text-gray-600 text-sm">Define your professional offerings and fee schedule.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-8 items-start w-full">
        {/* Left Sidebar: Photo & Status */}
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
            <h3 className="text-lg font-bold text-[#0A2519] text-center">{initialData?.name || "Legal Professional"}</h3>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest text-center mt-1">{watchCategory}</p>

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

          <div className="bg-[#F3F5F2] p-4 rounded-lg border border-gray-200/60 flex flex-col gap-4">
            <Controller
              name="status"
              control={control}
              defaultValue="Available"
              render={({ field: { onChange, value } }) => (
                <Select
                  className="w-full"
                  placeholder="Select status"
                  value={value}
                  onChange={onChange}
                >
                  <Label className="text-xs font-semibold mb-1 block">Account Status</Label>
                  <Select.Trigger className="w-full px-3 py-2 border border-gray-300 bg-white rounded shadow-none text-left flex justify-between items-center">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="Available" textValue="Available">Available</ListBox.Item>
                      <ListBox.Item id="Busy" textValue="Busy">Busy</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              )}
            />

            <div className="flex justify-between items-center mt-2">
              <span className="text-xs font-semibold">Member Since:</span>
              <span className="text-xs font-medium text-gray-600">{memberSince}</span>
            </div>
          </div>
        </div>

        {/* Right Form: Personal Details */}
        <div className="flex-1 w-full bg-white border-t-2 border-[#A48039] p-8 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-b-xl rounded-tr-xl">
          <h2 className="text-xl font-bold text-[#0A2519] mb-6">Personal Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col gap-1 w-full">
              <Label className="text-sm font-medium mb-1 block">Name</Label>
              <Input
                {...register("fullName")}
                placeholder={initialData?.name || 'Your Name'}
                className="w-full px-3 py-2 border border-gray-300 rounded-none bg-white shadow-none focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <Label className="text-sm font-medium mb-1 block">
                <div className="flex justify-between items-center w-full">
                  <span>Email Address</span>
                  <span className="text-[10px] text-gray-400 font-mono">{"{Archival}"}</span>
                </div>
              </Label>
              <Input
                {...register("email")}
                placeholder="jane.doe@lexmarket.com"
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-none bg-gray-50 text-gray-500 shadow-none focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    className="w-full"
                    placeholder="Select practice area"
                    value={value}
                    onChange={onChange}
                  >
                    <Label className="text-sm font-medium mb-1 block">Practice Area</Label>
                    <Select.Trigger className="w-full px-3 py-3 border border-gray-300 bg-white rounded-none shadow-none text-left flex justify-between items-center">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        <ListBox.Item id="Corporate" textValue="Corporate">Corporate</ListBox.Item>
                        <ListBox.Item id="Family" textValue="Family">Family</ListBox.Item>
                        <ListBox.Item id="Criminal" textValue="Criminal">Criminal</ListBox.Item>
                        <ListBox.Item id="Intellectual Property" textValue="Intellectual Property">Intellectual Property</ListBox.Item>
                        <ListBox.Item id="Cyber" textValue="Cyber">Cyber</ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                )}
              />
              {errors.category && <span className="text-red-500 text-xs mt-1">{errors.category.message}</span>}
            </div>

            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-1 w-1/2">
                <Label className="text-sm font-medium mb-1 block">Experience (Yrs)</Label>
                <Input
                  {...register("experience", { required: "Required", min: 0 })}
                  type="number"
                  placeholder="8"
                  className="w-full px-3 py-2 border border-gray-300 rounded-none shadow-none focus:outline-none focus:border-[#0A2519]"
                />
                {errors.experience && <span className="text-red-500 text-xs">{errors.experience.message}</span>}
              </div>

              <div className="flex flex-col gap-1 w-1/2">
                <Label className="text-sm font-medium mb-1 block">Consultation Fee ($/hr)</Label>
                <Input
                  {...register("fee", { required: "Required", min: 0 })}
                  type="number"
                  placeholder="120"
                  className="w-full px-3 py-2 border border-gray-300 rounded-none shadow-none focus:outline-none focus:border-[#0A2519]"
                />
                {errors.fee && <span className="text-red-500 text-xs">{errors.fee.message}</span>}
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-[#0A2519] mb-6">Professional Biography</h2>

          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium mb-1 block">Biography Overview</Label>
            <TextArea
              {...register("bio", { required: "Biography is required" })}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-none shadow-none focus:outline-none focus:border-[#0A2519] resize-none"
              placeholder="Provide a detailed professional summary..."
            />
            {errors.bio && <span className="text-red-500 text-xs">{errors.bio.message}</span>}
          </div>

          <div className="w-full h-px bg-gray-200 my-8"></div>

          <div className="flex justify-end items-center gap-4">
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
      </form>
    </div>
  );
}

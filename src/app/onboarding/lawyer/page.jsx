"use client";

import { uploadImgbb } from "@/lib/action/uploadImgbb";
import { authClient } from "@/lib/auth-client";
import { Input, Button, TextArea, Select, ListBox, Label } from "@heroui/react";
import { redirect, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

export default function LawyerOnboardingPage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (!isPending) {
            if (!session) {
                router.push('/auth/login');
            } else if (session?.user?.role === 'user') {
                router.push('/');
            } else {
                setIsChecking(false);
            }
        }
    }, [session, isPending, router]);

    if (isPending || isChecking) {
        return <div className="min-h-[calc(100vh-80px)] flex items-center justify-center text-gray-500">Loading...</div>;
    }

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onTouched",
    });

    const onSubmit = async (data) => {
        if (!session?.user?.email) {
            toast.error("User session not found.");
            return;
        }

        if (!data.image || !data.image[0]) {
            toast.error("Please upload a professional photo.");
            return;
        }

        try {
            // Upload image
            const userImage = await uploadImgbb(data.image[0]);

            // Construct payload
            const payload = {
                name: session.user.name,
                email: session.user.email,
                image: session.user.name,
                category: data.category,
                experience: `${data.experience} Years`,
                bio: data.bio,
                fee: Number(data.fee),
                status: data.status || "Available",
                createdAt: new Date().toISOString()
            };

            // Post to backend
            const res = await fetch('http://localhost:5000/lawyers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to create lawyer profile");

            toast.success('Profile completed successfully!');
            router.push('/dashboard/lawyer');
        } catch (error) {
            console.error("Onboarding Error:", error);
            toast.error(error.message || "An error occurred during onboarding.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4 sm:px-6 lg:px-8 bg-[#F9F9F9]">
            <div className="w-full max-w-2xl space-y-8 bg-white p-8 md:p-12 shadow-sm border border-gray-100">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-[#0A2519]">Complete Your Profile</h2>
                    <p className="mt-2 text-sm text-gray-600">Please provide your professional details to be listed in the registry.</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Category Select */}
                        <div className="flex flex-col gap-1 w-full">
                            <Controller
                                name="category"
                                control={control}
                                rules={{ required: "Category is required" }}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        className="w-full"
                                        placeholder="Select category"
                                        defaultValue={value}
                                        onChange={(keys) => onChange(Array.from(keys)[0])}
                                        variant="bordered"
                                        radius="none"
                                        classNames={{
                                            trigger: "border-gray-300 bg-white shadow-none rounded-none py-6",
                                        }}
                                    >
                                        <Label className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2 block">Practice Area</Label>
                                        <Select.Trigger>
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
                            {errors.category && <span className="text-red-500 text-xs">{errors.category.message}</span>}
                        </div>

                        {/* Experience Input */}
                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-1">Experience (Years)</label>
                            <Input
                                {...register("experience", {
                                    required: "Experience is required",
                                    min: { value: 0, message: "Cannot be negative" }
                                })}
                                type="number"
                                placeholder="e.g. 8"
                                variant="bordered"
                                radius="none"
                                classNames={{
                                    inputWrapper: "border-gray-300 bg-white shadow-none rounded-none",
                                }}
                            />
                            {errors.experience && <span className="text-red-500 text-xs">{errors.experience.message}</span>}
                        </div>

                        {/* Fee Input */}
                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-1">Consultation Fee ($/HR)</label>
                            <Input
                                {...register("fee", {
                                    required: "Fee is required",
                                    min: { value: 0, message: "Cannot be negative" }
                                })}
                                type="number"
                                placeholder="120"
                                variant="bordered"
                                radius="none"
                                classNames={{
                                    inputWrapper: "border-gray-300 bg-white shadow-none rounded-none",
                                }}
                            />
                            {errors.fee && <span className="text-red-500 text-xs">{errors.fee.message}</span>}
                        </div>

                        {/* Status Select */}
                        <div className="flex flex-col gap-1 w-full">
                            <Controller
                                name="status"
                                control={control}
                                defaultValue="Available"
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        className="w-full"
                                        placeholder="Select status"
                                        selectedKey={value}
                                        onSelectionChange={(keys) => onChange(Array.from(keys)[0])}
                                        variant="bordered"
                                        radius="none"
                                        classNames={{
                                            trigger: "border-gray-300 bg-white shadow-none rounded-none py-6",
                                        }}
                                    >
                                        <Label className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2 block">Current Status</Label>
                                        <Select.Trigger>
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
                        </div>
                    </div>

                    {/* Bio Textarea */}
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-1">Professional Summary</label>
                        <TextArea
                            {...register("bio", { required: "Professional summary is required" })}
                            placeholder="Experienced corporate lawyer specializing in..."
                            variant="bordered"
                            radius="none"
                            minRows={4}
                            classNames={{
                                inputWrapper: "border-gray-300 bg-white shadow-none rounded-none",
                            }}
                        />
                        {errors.bio && <span className="text-red-500 text-xs">{errors.bio.message}</span>}
                    </div>

                    {/* Image Upload */}
                    {/* <div className="flex flex-col gap-1 w-full mt-2">
                        <label className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-1">Professional Photo</label>
                        <Input
                            {...register("image", { required: "Photo is required" })}
                            type="file"
                            accept="image/*"
                            variant="bordered"
                            radius="none"
                            classNames={{
                                inputWrapper: "border-gray-300 bg-white shadow-none rounded-none h-12 pt-1",
                                input: "file:mr-4 file:py-1 file:px-3 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-[#EAECE8] file:text-[#0A2519] hover:file:bg-[#D4D8CF] cursor-pointer"
                            }}
                        />
                        {errors.image && <span className="text-red-500 text-xs">{errors.image.message}</span>}
                    </div> */}

                    <div className="pt-4">
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            className="w-full bg-[#0A2519] hover:bg-[#113a27] text-white font-semibold py-6 rounded-none text-base"
                        >
                            Complete Profile
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

"use client";

import { uploadImgbb } from "@/lib/action/uploadImgbb";
import { authClient } from "@/lib/auth-client";
import { Form, Input, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export default function RegisterPage() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    const onSubmit = async (data) => {
        console.log(data);
        // Safety check: Ensure the user actually selected a file
        if (!data.image || !data.image[0]) {
            toast.error("Please select a valid image file.");
            return;
        }

        const { fullName, email, confirmPassword } = data;

        const userImage = await uploadImgbb(data.image[0]);
        // console.log(userImage.url);

        const { data: res, error } = await authClient.signUp.email({
            name: fullName, // required
            email: email, // required
            password: confirmPassword, // required
            image: userImage.url,
        });

        if (res) {
            toast.success('Registration successful!');
            router.push('/choose-role');
        }
        if (error) {
            console.error("Registration Error Details:", error);
            // Better-auth might return error inside error.error or as statusText
            const errorMessage = error.message || error?.error?.message || error.statusText || (typeof error === 'string' ? error : "Registration failed");
            toast.error(errorMessage);
        }
    };

    const password = watch("password", "");

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4 sm:px-6 lg:px-8 bg-[#F9F9F9]">
            <div className="w-full max-w-md space-y-8 bg-transparent">
                <div className="text-center">
                    <h2 className="mt-6 text-4xl font-bold text-[#0A2519]">LegalEase</h2>
                    <p className="mt-2 text-sm text-gray-600">Client Intake & Archival Registry</p>
                </div>

                <Form className="mt-8 space-y-6 flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-5 w-full">
                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Full Name</label>
                            <Input
                                {...register("fullName", { required: "Full name is required" })}
                                placeholder="Jane Doe"
                                variant="bordered"
                                radius="none"
                                className={{
                                    inputWrapper: "border-gray-300 bg-white shadow-none rounded-none",
                                }}
                            />
                            {errors.fullName && <span className="text-red-500">{errors.fullName.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Email Address</label>
                            <Input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                type="email"
                                placeholder="jane@example.com"
                                variant="bordered"
                                radius="none"
                                className={{
                                    inputWrapper: "border-gray-300 bg-white shadow-none rounded-none",
                                }}
                            />
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Password</label>
                            <div className="relative flex w-full">
                                <Input
                                    className="w-full"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must have at least 8 characters"
                                        }
                                    })}
                                    type={isVisible ? "text" : "password"}
                                    placeholder="••••••••"
                                    variant="bordered"
                                    radius="none"
                                    classNames={{
                                        inputWrapper: "border-gray-300 bg-white shadow-none rounded-none pr-10 w-full",
                                    }}
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-gray-500 hover:text-gray-800 transition-colors" onClick={() => setIsVisible(!isVisible)}>
                                    {isVisible ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
                                </span>
                            </div>
                            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Confirm Password</label>
                            <div className="relative flex w-full">
                                <Input
                                    className="w-full"
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: value => value === password || "The passwords do not match"
                                    })}
                                    type={isConfirmVisible ? "text" : "password"}
                                    placeholder="••••••••"
                                    variant="bordered"
                                    radius="none"
                                    classNames={{
                                        inputWrapper: "border-gray-300 bg-white shadow-none rounded-none pr-10 w-full",
                                    }}
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-gray-500 hover:text-gray-800 transition-colors" onClick={() => setIsConfirmVisible(!isConfirmVisible)}>
                                    {isConfirmVisible ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
                                </span>
                            </div>
                            {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
                        </div>

                        {/* Image field */}
                        <div className="flex flex-col gap-1 w-full mt-2">
                            <label className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Profile Picture (Optional)</label>
                            <Input
                                {...register("image", { required: "Image is required" })}
                                type="file"
                                accept="image/*"
                                variant="bordered"
                                radius="none"
                                className={{
                                    inputWrapper: "border-gray-300 bg-white shadow-none rounded-none h-12 pt-1",
                                    input: "file:mr-4 file:py-1 file:px-3 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-[#EAECE8] file:text-[#0A2519] hover:file:bg-[#D4D8CF] cursor-pointer"
                                }}
                            />
                            {errors.image && <p className="text-red-500">{errors.image.message}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 w-full mt-6">
                        <Button
                            type="submit"
                            className="w-full bg-[#A48039] hover:bg-[#8e6e30] text-white font-semibold py-6 rounded-none text-base"
                        >
                            Create Account
                        </Button>

                        <div className="relative flex items-center justify-center my-2">
                            <div className="absolute inset-0 flex items-center">
                            </div>
                            <span className="relative bg-transparent px-2 text-xs text-gray-400">OR</span>
                        </div>

                        <Button
                            variant="bordered"
                            className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-6 rounded-none flex items-center gap-2"
                            type="button"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
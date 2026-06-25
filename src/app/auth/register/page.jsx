"use client";

import { uploadImgbb } from "@/lib/action/uploadImgbb";
import { authClient } from "@/lib/auth-client";
import { Input, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

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
        // Safety check: Ensure the user actually selected a file
        if (!data.image || !data.image[0]) {
            toast.error("Please select a valid image file.");
            return;
        }

        const { fullName, email, confirmPassword } = data;

        const userImage = await uploadImgbb(data.image[0]);

        const { data: res, error } = await authClient.signUp.email({
            name: fullName,
            email: email,
            password: confirmPassword,
            image: userImage.url,
        });

        if (res) {
            toast.success('Registration successful!');
            router.push('/choose-role');
        }
        if (error) {
            console.error("Registration Error Details:", error);
            const errorMessage = error.message || error?.error?.message || error.statusText || (typeof error === 'string' ? error : "Registration failed");
            toast.error(errorMessage);
        }
    };

    const password = watch("password", "");

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/choose-role"
        });
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4 sm:px-6 lg:px-8 bg-[#F9F9F9]">
            <div className="w-full max-w-md space-y-8 bg-transparent">
                <div className="text-center">
                    <h2 className="mt-6 text-4xl font-bold text-[#0A2519]">LegalEase</h2>
                    <p className="mt-2 text-sm text-gray-600">Client Intake & Archival Registry</p>
                </div>

                <form className="mt-8 space-y-6 flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-5 w-full">

                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Full Name</label>
                            <Input
                                {...register("fullName", { required: "Full name is required" })}
                                placeholder="Jane Doe"
                                variant="bordered"
                                radius="none"
                                className="border-gray-300 bg-white shadow-none rounded-none"
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
                                className="border-gray-300 bg-white shadow-none rounded-none"
                            />
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Password</label>
                            <div className="relative flex w-full">
                                <Input
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
                                    className="w-full border-gray-300 bg-white shadow-none rounded-none pr-10"
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
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: value => value === password || "The passwords do not match"
                                    })}
                                    type={isConfirmVisible ? "text" : "password"}
                                    placeholder="••••••••"
                                    variant="bordered"
                                    radius="none"
                                    className="w-full border-gray-300 bg-white shadow-none rounded-none pr-10"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-gray-500 hover:text-gray-800 transition-colors" onClick={() => setIsConfirmVisible(!isConfirmVisible)}>
                                    {isConfirmVisible ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
                                </span>
                            </div>
                            {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
                        </div>

                        {/* Image field */}
                        <div className="flex flex-col gap-1 w-full mt-2">
                            <label className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Profile Picture</label>
                            <input
                                {...register("image", { required: "Image is required" })}
                                type="file"
                                accept="image/*"
                                className="w-full border border-gray-300 bg-white h-12 px-3 pt-[9px] file:mr-4 file:py-1 file:px-3 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-[#EAECE8] file:text-[#0A2519] hover:file:bg-[#D4D8CF] cursor-pointer focus:outline-none"
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
                            onClick={handleGoogleLogin}
                            variant="bordered"
                            className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-6 rounded-none flex items-center gap-2"
                            type="button"
                        >
                            <FcGoogle />
                            Continue with Google
                        </Button>

                        <p className="mt-4 text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link href="/auth/login" className="text-[#A48039] font-bold hover:underline">
                                Login In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
"use client";

import { authClient } from "@/lib/auth-client";
import { Input, Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onTouched",
    });

    const onSubmit = async (data) => {
        const { email, password } = data;

        const { data: res, error } = await authClient.signIn.email({
            email,
            password,
        });

        if (res) {
            toast.success('Login successful!');
            router.push('/');
        }
        if (error) {
            // console.error("Login Error Details:", error);
            const errorMessage = error.message || error?.error?.message || error.statusText || (typeof error === 'string' ? error : "Login failed");
            toast.error(errorMessage);
        }
    };

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
                    <p className="mt-2 text-sm text-gray-600">Professional Archival Standards Applied</p>
                </div>

                <form className="mt-8 space-y-6 flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-5 w-full">
                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Email</label>
                            <Input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                type="email"
                                placeholder="counsel@firm.com"
                                variant="bordered"
                                radius="none"
                                className="border-gray-300 bg-white shadow-none rounded-none"
                            />
                            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Password</label>
                            <div className="relative flex w-full">
                                <Input
                                    {...register("password", {
                                        required: "Password is required",
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
                            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 w-full mt-6">
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            className="w-full bg-[#A48039] hover:bg-[#8e6e30] text-white font-semibold py-6 rounded-none text-base"
                        >
                            Login
                        </Button>

                        <div className="relative flex items-center justify-center my-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <span className="relative bg-[#F9F9F9] px-2 text-xs text-gray-500 uppercase tracking-widest">OR</span>
                        </div>

                        <Button
                            variant="bordered"
                            onPress={handleGoogleLogin}
                            className="w-full bg-transparent border border-[#0A2519] text-[#0A2519] font-bold py-6 rounded-none flex items-center gap-2 hover:bg-[#EAECE8]"
                            type="button"
                        >
                            <FcGoogle />
                            Continue with Google
                        </Button>

                        <p className="mt-4 text-center text-sm text-gray-600">
                            Don't have an account yet?{" "}
                            <Link href="/auth/register" className="text-[#A48039] font-bold hover:underline">
                                Register
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
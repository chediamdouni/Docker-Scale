"use client";


import RegisterForm from "./Form";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  const { status } = useSession();

  if (status === "authenticated") {
    redirect("/profile");
  }

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="/placeholder.svg?height=1080&width=1080"
          alt="Abstract background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-90" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">
            Welcome to Our Platform
          </h1>
        </div>
      </div>
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="w-full max-w-md px-4 py-5">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

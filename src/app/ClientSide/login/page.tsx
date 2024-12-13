"use client";

import LoginForm from "./LoginForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const { status } = useSession();

  if (status === "authenticated") {
    redirect("/profile");
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <LoginForm />
    </div>
  );
}

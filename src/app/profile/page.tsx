"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!session) {
    redirect("/ClientSide/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600">Welcome back, {session.user?.name || session.user?.username}!</p>
        </div>

        <div className="space-y-4">
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700">User Information</h2>
            <p className="text-gray-600">Name: {session.user?.name || session.user?.username}</p>
            {session.user?.email && <p className="text-gray-600">Email: {session.user.email}</p>}
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
} 
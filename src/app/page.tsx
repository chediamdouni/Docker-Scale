"use client";

// import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Hero from "@/components/hero";
import Header from "@/components/header";
import Features from "@/components/features";
import Stats from "@/components/stats";
import SocialProof from "@/components/social-proof";
import Testimonials from "@/components/testimonials";
import Pricing from "@/components/pricing";
import Footer from "@/components/footer";

export default function Home() {
  const { status } = useSession();

  if (status === "authenticated") {
    redirect("/profile");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <SocialProof />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

import MobileBottomBar from "@/components/dashboard/MobileBottomBar";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {

  const supabase =
    await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // PROTECTED ROUTE
  if (!user) {

    redirect("/login");
  }

  // CHECK BUSINESS SETUP
  const { data: business } =
    await supabase
      .from("businesses")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

  // REDIRECT TO SETUP
  if (!business) {

    redirect("/setup");
  }

  return (

    <div className="min-h-screen bg-[#f6f8ff]">

      {/* DESKTOP SIDEBAR */}
      <DashboardSidebar />

      {/* MAIN CONTENT */}
      <div className="min-h-screen lg:pl-[290px]">

        {/* TOP NAVBAR */}
        <DashboardNavbar />

        {/* PAGE CONTENT */}
        <main className="px-4 pb-32 pt-24 sm:px-6 lg:px-8 lg:pb-10">

          <div className="mx-auto w-full max-w-[1600px]">

            {children}

          </div>

        </main>

      </div>

      {/* MOBILE NAVIGATION */}
      <MobileBottomBar />

    </div>
  );
}
import type { ReactNode }
from "react";

import { redirect }
from "next/navigation";

import {
  createClient,
} from "@/utils/supabase/server";

import DashboardSidebar
from "@/components/dashboard/DashboardSidebar";

import DashboardNavbar
from "@/components/dashboard/DashboardNavbar";

import MobileBottomBar
from "@/components/dashboard/MobileBottomBar";

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

  if (!user) {

    redirect("/login");
  }

  return (

    <div
      className="min-h-screen bg-[#f4f7ff]">

      {/* Desktop Sidebar */}
      <DashboardSidebar />

      {/* Main */}
      <div
        className="lg:pl-[290px]">

        {/* Top Navbar */}
        <DashboardNavbar />

        {/* Main Content */}
        <main
          className="px-4 pb-32 pt-24 sm:px-6 lg:px-8lg:pb-8">

          {children}

        </main>

      </div>

      {/* Mobile Bottom Bar */}
      <MobileBottomBar />

    </div>
  );
}
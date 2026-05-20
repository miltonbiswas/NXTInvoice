import React from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileBottomBar from "@/components/dashboard/MobileBottomBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full flex-col bg-[#f4f7fe] font-sans antialiased text-[#1b2559] lg:flex-row overflow-hidden">
      
      {/* SIDEBAR Component */}
      <DashboardSidebar />

      {/* MAIN VIEWPORT CONTAINER */}
      <div className="flex flex-1 flex-col overflow-hidden pb-24 lg:pb-0">
        
        {/* VIEWPORT CONTENT HUB */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* FLOATING MOBILE BAR */}
      <MobileBottomBar />
    </div>
  );
}
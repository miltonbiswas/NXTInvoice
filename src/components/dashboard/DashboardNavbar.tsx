"use client";

import { Bell } from "lucide-react";
import { LogOut } from "lucide-react";
import { Menu } from "lucide-react";

import { useRouter }
from "next/navigation";

import { createClient }
from "@/utils/supabase/client";

export default function DashboardNavbar() {

  const router = useRouter();

  const supabase = createClient();

  async function handleLogout() {

    await supabase.auth.signOut();

    router.push("/login");
  }

  return (

    <header
      className="fixed left-0 right-0 top-0 z-40 flex h-20 items-center justify-between border-b border-black/5 bg-white/80 px-4 backdrop-blur-2xl lg:left-[290px] lg:px-8">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu Button */}
        <button
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/5 bg-white shadow-sm lg:hidden">

          <Menu size={20} />

        </button>

        {/* Heading */}
        <div>

          <h1
            className="text-2xl font-black text-[#0f172a]">

            Dashboard

          </h1>

          <p
            className="hidden text-sm text-gray-500 sm:block">

            Welcome back to your workspace

          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">

        {/* Notification */}
        <button
          className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-black/5 bg-white transition-all hover:shadow-lg sm:flex">

          <Bell size={18} />

        </button>

        {/* Profile */}
        <div
          className="hidden items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 py-2 shadow-sm md:flex">

          <div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 text-sm font-bold text-white">

            M

          </div>

          <div>

            <p
              className="text-sm font-semibold text-[#0f172a]">

              Milton Biswas

            </p>

            <p
              className="text-xs text-gray-500">

              Owner

            </p>

          </div>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex h-12 items-center gap-2 rounded-2xl border border-red-100 bg-white px-4 text-sm font-medium text-red-500 transition-all hover:bg-red-50 hover:shadow-sm">

          <LogOut size={16} />

          <span className="hidden sm:block">

            Logout

          </span>

        </button>

      </div>

    </header>
  );
}
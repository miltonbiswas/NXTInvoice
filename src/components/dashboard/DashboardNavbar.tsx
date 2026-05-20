"use client";

import { useEffect, useState } from "react";

import {
  Bell,
  LogOut,
  Menu,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/client";

export default function DashboardNavbar() {

  const router = useRouter();

  const supabase = createClient();

  const [businessName, setBusinessName] =
    useState("Business");

  useEffect(() => {

    async function loadBusiness() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("businesses")
        .select("business_name")
        .eq("user_id", user.id)
        .single();

      if (data?.business_name) {

        setBusinessName(
          data.business_name
        );

      }

    }

    loadBusiness();

  }, []);

  async function handleLogout() {

    await supabase.auth.signOut();

    router.push("/login");

  }

  return (

    <header className="fixed left-0 right-0 top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-2xl lg:left-[290px]">

      <div className="flex min-h-[92px] items-center justify-between px-5 py-5 lg:px-8">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">

          {/* MOBILE MENU */}
          <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/5 bg-white shadow-sm transition hover:bg-[#f8faff] lg:hidden">

            <Menu size={20} />

          </button>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* NOTIFICATION */}
          <button className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-black/5 bg-white shadow-sm transition hover:bg-[#f8faff] sm:flex">

            <Bell size={18} />

          </button>

          {/* PROFILE */}
          <div className="hidden items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 py-2 shadow-sm md:flex">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 text-sm font-bold text-white">

              {businessName.charAt(0)}

            </div>

            <div className="leading-tight">

              <p className="max-w-[140px] truncate text-sm font-bold text-[#0f172a]">

                {businessName}

              </p>

              <p className="text-xs text-gray-500">

                Owner

              </p>

            </div>

          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="flex h-12 items-center gap-2 rounded-2xl border border-red-100 bg-white px-5 text-sm font-semibold text-red-500 shadow-sm transition hover:bg-red-50"
          >

            <LogOut size={16} />

            <span className="hidden sm:block">

              Logout

            </span>

          </button>

        </div>

      </div>

    </header>

  );

}
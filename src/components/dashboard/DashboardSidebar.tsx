"use client";

import { useState } from "react";

import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  Plus,
} from "lucide-react";

import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: FileText,
  },
  {
    name: "Clients",
    href: "/dashboard/clients",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {

  const pathname = usePathname();

  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  async function handleLogout() {

    await supabase.auth.signOut();

    router.push("/login");
  }

  return (

    <>

      {/* MOBILE TOPBAR */}
      <div className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-black/5 bg-white px-5 lg:hidden">

        <Link
          href="/dashboard"
          className="text-2xl font-black tracking-tight text-[#0f172a]"
        >

          NXTInvoice®

        </Link>

        <button
          onClick={() =>
            setOpen(!open)
          }
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-white"
        >

          {open ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}

        </button>

      </div>

      {/* MOBILE SIDEBAR */}
      {open && (

        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden">

          <div className="absolute left-0 top-0 h-full w-[280px] bg-white p-5">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-black text-[#0f172a]">

                NXTInvoice®

              </h2>

              <button
                onClick={() =>
                  setOpen(false)
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10"
              >

                <X size={18} />

              </button>

            </div>

            <div className="mt-8 space-y-2">

              {navigation.map((item) => {

                const Icon = item.icon;

                const active =
                  pathname === item.href;

                return (

                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() =>
                      setOpen(false)
                    }
                    className={`flex h-14 items-center gap-4 rounded-2xl px-5 font-semibold transition-all duration-300 ${active
                      ? "bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 text-white"
                      : "text-gray-600 hover:bg-[#f8fafc]"
                      }`}
                  >

                    <Icon size={20} />

                    {item.name}

                  </Link>
                );
              })}

            </div>

            <button
              onClick={handleLogout}
              className="absolute bottom-5 left-5 right-5 flex h-14 items-center justify-center gap-3 rounded-2xl border border-red-200 bg-red-50 font-semibold text-red-600"
            >

              <LogOut size={18} />

              Logout

            </button>

          </div>

        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden h-screen w-[280px] flex-col border-r border-black/5 bg-white lg:flex">

        <div className="border-b border-black/5 p-8">

          <Link
            href="/dashboard"
            className="text-3xl font-black tracking-tight text-[#0f172a]"
          >

            NXTInvoice®

          </Link>

          <p className="mt-2 text-sm text-gray-500">

            Enterprise Billing Platform

          </p>

        </div>

        <div className="flex-1 space-y-2 p-5">

          {navigation.map((item) => {

            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (

              <Link
                key={item.href}
                href={item.href}
                className={`flex h-14 items-center gap-4 rounded-2xl px-5 font-semibold transition-all duration-300 ${active
                  ? "bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 text-white shadow-lg shadow-blue-500/20"
                  : "text-gray-600 hover:bg-[#f8fafc]"
                  }`}
              >

                <Icon size={20} />

                {item.name}

              </Link>
            );
          })}

        </div>

        <div className="border-t border-black/5 p-5">

          <Link
            href="/dashboard/invoices/create"
            className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 font-semibold text-white"
          >

            <Plus size={18} />

            Create Invoice

          </Link>

          <button
            onClick={handleLogout}
            className="mt-4 flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-red-200 bg-red-50 font-semibold text-red-600"
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </aside>

      {/* MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-4 border-t border-black/5 bg-white lg:hidden">

        {navigation.map((item) => {

          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (

            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 py-3 text-xs font-semibold ${active
                ? "text-blue-600"
                : "text-gray-500"
                }`}
            >

              <Icon size={20} />

              {item.name}

            </Link>
          );
        })}

      </div>

    </>
  );
}
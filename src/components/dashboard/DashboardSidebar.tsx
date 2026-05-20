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
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  // Programmatic navigation handling for guaranteed routing triggers
  const handleCreateInvoiceNavigate = () => {
    setOpen(false);
    router.push("/dashboard/invoices/create");
  };

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-black/5 bg-white px-5 lg:hidden">
        <Link
          href="/dashboard"
          className="text-xl font-bold tracking-tight text-[#1b2559]"
        >
          NXTInvoice®
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-white text-[#1b2559] shadow-sm"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE DRAWER SIDEBAR */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/30 lg:hidden">
          <div className="absolute left-0 top-0 flex h-full w-[280px] flex-col bg-white p-6 shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[#1b2559]">
                  NXTInvoice®
                </h2>
                <p className="text-xs text-gray-400">Enterprise Billing</p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-100"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            {/* Navigation Links inside Mobile Drawer */}
            <div className="mt-8 flex-1 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex h-12 items-center gap-4 rounded-xl px-4 text-sm font-semibold transition-all duration-200 ${
                      active
                        ? "bg-gradient-to-r from-[#4318ff] to-[#43a1ff] text-white shadow-md"
                        : "text-gray-500 hover:bg-gray-50 hover:text-[#1b2559]"
                    }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Actions inside Mobile Drawer */}
            <div className="space-y-3 border-t border-gray-100 pt-4">
              <button
                onClick={handleCreateInvoiceNavigate}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4318ff] to-[#43a1ff] text-sm font-bold text-white shadow-md"
              >
                <Plus size={16} />
                Create Invoice
              </button>

              <button
                onClick={handleLogout}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-red-50 bg-red-50/50 text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden h-screen w-64 flex-col justify-between border-r border-gray-100 bg-white p-6 lg:flex">
        {/* Top Scope: Branding & Nav items */}
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#1b2559]">
              NXTInvoice®
            </h1>
            <p className="text-xs text-gray-400">Enterprise Billing Platform</p>
          </div>

          <nav className="flex flex-col space-y-1.5">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex h-12 items-center gap-3 rounded-xl px-4 text-sm font-bold transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-r from-[#4318ff] to-[#43a1ff] text-white shadow-md"
                      : "text-gray-400 hover:bg-gray-50 hover:text-[#1b2559]"
                  }`}
                >
                  <Icon size={18} className={active ? "text-white" : "text-gray-400"} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Scope: Action Buttons */}
        <div className="mt-auto space-y-3 border-t border-gray-50 pt-4">
          <button
            onClick={handleCreateInvoiceNavigate}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4318ff] to-[#43a1ff] text-sm font-bold text-white shadow-lg shadow-[#4318ff]/10 hover:opacity-95 cursor-pointer transition-all"
          >
            <Plus size={16} />
            <span>Create Invoice</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-red-50 bg-red-50/50 text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-4 border-t border-gray-100 bg-white pb-safe lg:hidden">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-bold transition-colors ${
                active ? "text-[#4318ff]" : "text-gray-400"
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
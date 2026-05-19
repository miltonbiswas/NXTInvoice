"use client";

import Link from "next/link";

import { useState } from "react";

import {
  LayoutDashboard,
  Receipt,
  Users,
  FileText,
  Settings,
  Menu,
  X,
} from "lucide-react";

const links = [

  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: Receipt,
  },

  {
    name: "Clients",
    href: "/dashboard/clients",
    icon: Users,
  },

  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },

  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar() {

  const [open, setOpen] =
    useState(false);

  return (

    <>

      {/* Mobile Toggle */}
      <button
        onClick={() =>
          setOpen(true)
        }
        className="fixed left-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-2xl border border-black/5 bg-white shadow-lg lg:hidden">

        <Menu size={20} />

      </button>

      {/* Overlay */}
      {open && (

        <div
          onClick={() =>
            setOpen(false)
          }
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"/>

      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0
 z-50 flex h-screen w-[290px] flex-col border-r border-black/5 bg-white/90 backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0
          ${open
            ? "translate-x-0"
            : "-translate-x-full"
          }
        `}
      >

        {/* Header */}
        <div
          className="flex h-20 items-center justify-between border-b border-black/5 px-6">

          <Link
            href="/dashboard"
            className=" text-3xl font-black tracking-tight">

            <span
              className="bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 bg-clip-text text-transparent">
              NXTInvoice®

            </span>

          </Link>

          {/* Close */}
          <button
            onClick={() =>
              setOpen(false)
            }
            className="lg:hidden"
          >

            <X size={22} />

          </button>

        </div>

        {/* Links */}
        <nav className="flex-1 px-5 py-8">

          <div className="space-y-2">

            {links.map((link) => {

              const Icon = link.icon;

              return (

                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() =>
                    setOpen(false)
                  }
                  className="flex h-14 items-center gap-4 rounded-2xl px-5 text-[15px] font-medium text-[#0f172a] transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50">
                  <Icon size={20} />

                  {link.name}

                </Link>
              );
            })}

          </div>

        </nav>

      </aside>

    </>
  );
}
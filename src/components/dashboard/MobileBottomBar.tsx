"use client";

import Link from "next/link";

import { usePathname }
from "next/navigation";

import {
  LayoutDashboard,
  Receipt,
  Users,
  Settings,
} from "lucide-react";

const items = [

  {
    name: "Home",
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
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function MobileBottomBar() {

  const pathname =
    usePathname();

  return (

    <div
      className="fixed bottom-4 left-1/2 z-50 flex w-[92%] max-w-md-translate-x-1/2 items-center justify-around rounded-[32px] border border-white/40 bg-white/80 px-2 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-2xl lg:hidden">

      {items.map((item) => {

        const Icon = item.icon;

        const active =
          pathname === item.href;

        return (

          <Link
            key={item.name}
            href={item.href}
            className=" flex flex-col items-center gap-1 ">

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300
                ${
                  active
                    ? `bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 text-white shadow-lg ` : ` text-gray-500`
                }
              `}
            >

              <Icon size={20} />

            </div>

            <span
              className={`text-[11px] font-medium

                ${
                  active
                    ? "text-black"
                    : "text-gray-400"
                }`}>

              {item.name}

            </span>

          </Link>
        );
      })}

    </div>
  );
}
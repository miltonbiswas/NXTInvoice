import Link from "next/link";

import {
  ArrowRight,
  BriefcaseBusiness,
  Camera,
  Globe,
  Phone,
} from "lucide-react";

import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#f4f7ff] text-[#0f172a] transition-colors duration-300 dark:bg-[#030712] dark:text-white">

      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

      </div>

      {/* NAVBAR */}

      <header className="relative z-20 border-b border-black/5 bg-white/60 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]">

        <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center justify-between px-4 sm:px-6 xl:px-10">

          {/* LOGO */}

          <Link
            href="/"
            className="group flex items-start"
          >

            <h1 className="bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 bg-clip-text text-3xl font-black tracking-tight text-transparent">

              NXTInvoice

            </h1>

            <span className="ml-1 mt-1 text-xs font-semibold text-gray-500 dark:text-gray-400">

              ®

            </span>

          </Link>

          {/* ACTIONS */}

          <div className="flex items-center gap-3">

            <ThemeToggle />

            <Link
              href="/login"
              className="hidden h-11 items-center justify-center rounded-xl border border-black/10 bg-white/80 px-5 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] hover:bg-white dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/[0.08] sm:flex"
            >
              Login
            </Link>

          </div>

        </div>

      </header>

      {/* HERO */}

      <section className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-16 sm:px-6 xl:px-10">

        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center text-center">

          {/* BADGE */}

          <div className="mb-8">

            <span className="rounded-full border border-black/10 bg-white/70 px-5 py-2 text-sm font-medium text-gray-600 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05] dark:text-gray-300">

              Modern Enterprise Invoicing Platform

            </span>

          </div>

          {/* TITLE */}

          <div className="flex flex-wrap items-start justify-center">

            <h1 className="bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 bg-clip-text text-center text-5xl font-black leading-none tracking-tight text-transparent sm:text-7xl xl:text-[120px]">

              NXTInvoice

            </h1>

            <span className="ml-2 mt-1 text-sm font-semibold text-gray-500 dark:text-gray-400 sm:mt-3 sm:text-xl xl:text-2xl">

              ®

            </span>

          </div>

          {/* SUBTITLE */}

          <p className="mt-8 max-w-5xl text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg xl:text-2xl">

            Smart invoicing platform crafted for freelancers,
            startups, medical stores, agencies, wholesalers,
            enterprises, and modern businesses.

          </p>

          {/* CTA */}

          <div className="mt-12 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">

            <Link href="/login">

              <button className="group flex h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 px-8 text-base font-semibold text-white shadow-2xl shadow-blue-500/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-blue-500/40 sm:h-16 sm:px-10 sm:text-lg">

                Get Started

                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />

              </button>

            </Link>

            <button className="h-14 rounded-2xl border border-black/10 bg-white/70 px-8 text-base font-semibold backdrop-blur-xl transition-all duration-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/[0.08] sm:h-16 sm:px-10 sm:text-lg">

              Learn More

            </button>

          </div>

          {/* DEVELOPER */}

          <div className="mt-20 w-full">

            <p className="text-sm text-gray-500">

              Developed by{" "}

              <span className="font-semibold text-[#0f172a] dark:text-white">

                Milton Biswas

              </span>

            </p>

            {/* SOCIALS */}

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center gap-3 rounded-2xl border border-black/10 bg-white/70 px-5 text-sm font-medium backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/[0.08]"
              >

                <Camera size={18} />

                Instagram

              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center gap-3 rounded-2xl border border-black/10 bg-white/70 px-5 text-sm font-medium backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/[0.08]"
              >

                <BriefcaseBusiness size={18} />

                LinkedIn

              </a>

              <a
                href="https://yourwebsite.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center gap-3 rounded-2xl border border-black/10 bg-white/70 px-5 text-sm font-medium backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/[0.08]"
              >

                <Globe size={18} />

                Website

              </a>

              <a
                href="tel:+911234567890"
                className="flex h-12 items-center gap-3 rounded-2xl border border-black/10 bg-white/70 px-5 text-sm font-medium backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/[0.08]"
              >

                <Phone size={18} />

                Call

              </a>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
import Link from "next/link";

import {
  ArrowRight,
  Globe,
  Camera,
  BriefcaseBusiness,
  Phone,
} from "lucide-react";

import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f8ff] text-black transition-colors duration-500 dark:bg-[#030712] dark:text-white">

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">

        {/* Left Glow */}
        <div className="absolute top-0 left-0 h-[700px] w-[700px] rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/20" />

        {/* Right Glow */}
        <div className="absolute bottom-0 right-0 h-[700px] w-[700px] rounded-full bg-violet-500/20 blur-3xl dark:bg-violet-500/20" />

        {/* Center Glow */}
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

      </div>

      {/* Navigation */}
      <header className="relative z-20 flex items-center justify-between px-6 py-7 md:px-12">

        {/* Brand */}
        <Link
          href="/"
          className="group flex items-start transition-opacity duration-300 hover:opacity-80"
        >

          <h1 className="bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 bg-clip-text text-3xl font-black tracking-tight text-transparent">

            NXTInvoice

          </h1>

          <span className="ml-1 mt-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
            ®
          </span>

        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-4">

          <ThemeToggle />

          <Link
            href="/login"
            className="hidden h-11 items-center justify-center rounded-2xl border border-black/10 bg-white/60 px-6 font-medium backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:bg-white/80 dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/[0.08] sm:flex"
          >
            Login
          </Link>

        </div>

      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex min-h-[82vh] flex-col items-center justify-center px-6 text-center">

        {/* Badge */}
        <div className="mb-8">

          <span className="rounded-full border border-black/10 bg-white/60 px-5 py-2 text-sm text-gray-600 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05] dark:text-gray-300">

            Modern SaaS Invoicing Platform

          </span>

        </div>

        {/* Hero Logo */}
        <div className="flex items-start justify-center">

          <h1 className="bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 bg-clip-text text-7xl font-black leading-none tracking-tight text-transparent md:text-[120px]">

            NXTInvoice

          </h1>

          <span className="ml-2 mt-3 text-lg font-semibold text-gray-500 dark:text-gray-400 md:text-2xl">
            ®
          </span>

        </div>

        {/* Subtitle */}
        <p className="mt-8 max-w-4xl text-lg font-medium leading-relaxed text-gray-700 dark:text-gray-400 md:text-2xl">

          Smart invoicing platform crafted for modern
          freelancers, startups, businesses, and enterprises.

        </p>

        {/* CTA Buttons */}
        <div className="mt-14 flex flex-col gap-5 sm:flex-row">

          {/* Primary CTA */}
          <Link href="/login">

            <button className="group flex h-16 items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 px-10 text-lg font-semibold text-white shadow-2xl shadow-blue-500/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-blue-500/40">

              Get Started

              <ArrowRight
                size={20}
                className="transition group-hover:translate-x-1"
              />

            </button>

          </Link>

          {/* Secondary CTA */}
          <button className="h-16 rounded-2xl border border-black/10 bg-white/60 px-10 text-lg font-semibold backdrop-blur-xl transition-all duration-300 hover:bg-white/80 dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/[0.08]">

            Learn More

          </button>

        </div>

        {/* Footer Developer */}
        <div className="mt-24">

          <p className="text-sm text-gray-500">

            Developed by{" "}

            <span className="font-semibold text-black dark:text-white">
              Milton Biswas
            </span>

          </p>

          {/* Social Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">

            {/* Instagram */}
            <a
              href="https://instagram.com/YOUR_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center gap-3 rounded-2xl border border-black/10 bg-white/60 px-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:bg-white/80 dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/[0.08]"
            >
              <Camera size={18} />

              <span className="font-medium">
                Instagram
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/YOUR_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center gap-3 rounded-2xl border border-black/10 bg-white/60 px-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:bg-white/80 dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/[0.08]"
            >
              <BriefcaseBusiness size={18} />

              <span className="font-medium">
                LinkedIn
              </span>
            </a>

            {/* Website */}
            <a
              href="https://yourwebsite.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center gap-3 rounded-2xl border border-black/10 bg-white/60 px-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:bg-white/80 dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/[0.08]"
            >
              <Globe size={18} />

              <span className="font-medium">
                Official Website
              </span>
            </a>

            {/* Call */}
            <a
              href="tel:+911234567890" className="flex h-14 items-center gap-3 rounded-2xl border border-black/10 bg-white/60 px-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:bg-white/80 dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/[0.08]"
            >
              <Phone size={18} />

              <span className="font-medium">
                Call Now
              </span>
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}
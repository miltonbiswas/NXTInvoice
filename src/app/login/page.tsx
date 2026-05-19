"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  ArrowLeft,
  ShieldCheck,
  Camera,
  BriefcaseBusiness,
  Globe,
  Phone,
  Mail,
} from "lucide-react";

import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return null;
}
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f8ff]">

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">

        {/* Left Glow */}
        <div className="absolute top-0 left-0 h-[700px] w-[700px] rounded-full bg-blue-500/15 blur-3xl" />

        {/* Right Glow */}
        <div className="absolute bottom-0 right-0 h-[700px] w-[700px] rounded-full bg-violet-500/15 blur-3xl" />

        {/* Center Glow */}
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:"linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main Layout */}
      <div className="relative z-10 min-h-screen">

        {/* MOBILE / TABLET TOPBAR */}
        <div className="flex items-center justify-between px-5 py-5 lg:hidden">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-start">

            <h1 className="bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 bg-clip-text text-3xl font-black tracking-tight text-transparent">

              NXTInvoice

            </h1>

            <span className="ml-1 mt-1 text-xs font-semibold text-gray-500">
              ®
            </span>

          </Link>

          {/* Back Button */}
          <Link
            href="/"
            className="flex h-11 items-center gap-2 rounded-2xl border border-black/10 bg-white/70 px-4 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white">

            <ArrowLeft size={16} />

            Back

          </Link>

        </div>

        {/* Responsive Grid */}
        <div className="grid min-h-screen lg:grid-cols-2">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="hidden lg:flex flex-col justify-between px-16 py-12"
          >

            {/* Top */}
            <div>

              {/* Brand */}
              <Link
                href="/"
                className="inline-flex items-start transition hover:opacity-80"
              >

                <h1 className="bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 bg-clip-text text-4xl font-black tracking-tight text-transparent">

                  NXTInvoice

                </h1>

                <span className="ml-1 mt-1 text-sm font-semibold text-gray-500">
                  ®
                </span>

              </Link>

              {/* Back Button */}
              <Link
                href="/"
                className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-black/10 bg-white/70 px-5 py-3 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white">

                <ArrowLeft size={18} />

                Back to homepage

              </Link>

            </div>

            {/* Main Content */}
            <div className="max-w-xl">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-5 py-2 text-sm text-gray-600 shadow-sm backdrop-blur-xl">

                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

                Premium Modern Invoicing Platform

              </div>

              {/* Heading */}
              <h1 className="mt-8 text-6xl font-black leading-tight tracking-tight text-[#0f172a]">

                Welcome back to your invoicing workspace.

              </h1>

              {/* Description */}
              <p className="mt-8 text-xl leading-relaxed text-gray-600">

                Manage invoices, clients, payments,
                and business operations with clarity,
                precision, and modern infrastructure.

              </p>

            </div>

            {/* Bottom */}
            <div className="flex items-center gap-3 text-sm text-gray-500">

              <ShieldCheck size={18} />

              Secure passwordless authentication

            </div>

          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="flex items-center justify-center px-5 py-6 sm:px-8 md:px-10 lg:px-12"
          >

            {/* Wrapper */}
            <div className="w-full max-w-md">

              {/* Main Card */}
              <div className="overflow-hidden rounded-[30px] border border-black/10 bg-white/70 shadow-[0_0_80px_rgba(59,130,246,0.08)] backdrop-blur-2xl">

                {/* Top Gradient */}
                <div className="h-[3px] w-full bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400" />

                {/* Content */}
                <div className="p-6 sm:p-8 md:p-10">

                  {/* Mobile Heading */}
                  <div className="lg:hidden">

                    <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs text-gray-600 shadow-sm backdrop-blur-xl">

                      <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

                      Secure Login

                    </div>

                  </div>

                  {/* Heading */}
                  <h2 className="mt-6 text-4xl font-black tracking-tight text-[#0f172a] sm:text-5xl">

                    Login

                  </h2>

                  {/* Subtitle */}
                  <p className="mt-3 text-[15px] leading-relaxed text-gray-600 sm:text-base">

                    Continue securely using your
                    email address.

                  </p>

                  {/* Form */}
                  <div className="mt-10">

                    <AuthForm />

                  </div>

                </div>

              </div>

              {/* Footer */}
              <div className="mt-8">

                {/* Divider */}
                <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

                {/* Branding */}
                <div className="text-center">

                  <p className="text-sm text-gray-500">

                    Crafted & Developed by{" "}

                    <span className="font-semibold text-[#0f172a]">
                      Milton Biswas
                    </span>

                  </p>

                </div>

                {/* Socials */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">

                  {/* Instagram */}
                  <a
                    href="https://instagram.com/miltonbiswasx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 items-center gap-2 rounded-2xl border border-black/10 bg-white/60 px-4 text-sm font-medium text-gray-700 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:bg-white sm:h-12 sm:px-5"
                  >

                    <Camera size={16} />

                    Instagram

                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com/in/xxmiltonbiswasxx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 items-center gap-2 rounded-2xl border border-black/10 bg-white/60 px-4 text-sm font-medium text-gray-700 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:bg-white sm:h-12 sm:px-5"
                  >

                    <BriefcaseBusiness size={16} />

                    LinkedIn

                  </a>

                  {/* Website */}
                  <a
                    href="https://miltonbiswas.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 items-center gap-2 rounded-2xl border border-black/10 bg-white/60 px-4 text-sm font-medium text-gray-700 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:bg-white sm:h-12 sm:px-5"
                  >

                    <Globe size={16} />

                    Website

                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+916377603244"
                    className="flex h-11 items-center gap-2 rounded-2xl border border-black/10 bg-white/60 px-4 text-sm font-medium text-gray-700 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:bg-white sm:h-12 sm:px-5"
                  >

                    <Phone size={16} />

                    Call

                  </a>

                  {/* Email */}
                  <a
                    href="mailto:miltonbiswasdev@gmail.com"
                    className="flex h-11 items-center gap-2 rounded-2xl border border-black/10 bg-white/60 px-4 text-sm font-medium text-gray-700 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:bg-white sm:h-12 sm:px-5"
                  >

                    <Mail size={16} />

                    Email

                  </a>

                </div>

                {/* Copyright */}
                <div className="mt-8 pb-6 text-center text-xs text-gray-400">

                  © 2026 NXTInvoice®. All rights reserved.

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </main>
  );
}
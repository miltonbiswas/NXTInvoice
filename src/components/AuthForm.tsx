"use client";

import { useState } from "react";

import { ArrowRight } from "lucide-react";

import { FcGoogle } from "react-icons/fc";

import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function AuthForm() {

  const [email, setEmail] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [googleLoading, setGoogleLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  // =========================================
  // EMAIL MAGIC LINK LOGIN
  // =========================================

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    setLoading(true);

    setMessage("");

    const { error } =
      await supabase.auth.signInWithOtp({
        email,

        options: {
          emailRedirectTo:
            `${window.location.origin}/auth/callback`,
        },
      });

    if (error) {

      setMessage(error.message);

    } else {

      setMessage(
        "Magic link sent successfully. Check your inbox."
      );
    }

    setLoading(false);
  }

  // =========================================
  // GOOGLE LOGIN
  // =========================================

  async function handleGoogleLogin() {

    setGoogleLoading(true);

    await supabase.auth.signInWithOAuth({
      provider: "google",

      options: {
        redirectTo:
          `${window.location.origin}/auth/callback`,
      },
    });

    setGoogleLoading(false);
  }

  return (

    <form
      onSubmit={handleLogin}
      className="space-y-6"
    >

      {/* Email Input */}
      <div>

        <label className="mb-3 block text-sm font-medium text-gray-700">

          Email Address

        </label>

        <input
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="h-14 w-full rounded-2xl border border-black/10 bg-white/80 px-5  text-[15px] text-black outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500/30 focus:bg-white focus:shadow-[0_0_25px_rgba(59,130,246,0.15)]"/>

      </div>

      {/* Email Button */}
      <button
        type="submit"
        disabled={loading}
        className="group flex h-14 w-full  items-center  justify-center gap-3 rounded-2xl  bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 text-[15px] font-semibold text-white shadow-xl shadow-blue-500/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-70">

        {loading
          ? "Sending Magic Link..."
          : "Continue"}

        {!loading && (

          <ArrowRight
            size={18}
            className="
              transition
              group-hover:translate-x-1
            "
          />

        )}

      </button>

      {/* Divider */}
      <div className="relative py-1">

        <div className="absolute inset-0 flex items-center">

          <div className="w-full border-t border-black/10" />

        </div>

        <div className="relative flex justify-center text-sm">

          <span className="bg-white px-4 text-gray-400">

            OR

          </span>

        </div>

      </div>

      {/* Google Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={googleLoading}
        className="group flex h-14 w-full items-center justify-center gap-4 rounded-2xl border border-black/10 bg-white/90 px-6 text-[15px] font-semibold text-[#0f172a] shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-[1px] hover:border-blue-400/30  hover:shadow-[0_10px_40px_rgba(59,130,246,0.12)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70">

        {/* Google Icon */}
        <div
          className=" flex h-8  w-8 items-center justify-center rounded-full bg-whiteshadow-sm">

          <FcGoogle className="text-xl" />

        </div>

        {/* Button Text */}
        <span>

          {googleLoading
            ? "Redirecting..."
            : "Continue with Google"}

        </span>

      </button>

      {/* Message */}
      {message && (

        <div
          className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-blue-700">

          {message}

        </div>

      )}

    </form>
  );
}
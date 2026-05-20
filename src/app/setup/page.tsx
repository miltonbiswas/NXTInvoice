"use client";

import { useEffect, useState } from "react";

import { useRouter }
from "next/navigation";

import {
  ArrowRight,
  Building2,
} from "lucide-react";

import { createClient }
from "@/utils/supabase/client";

export default function SetupPage() {

  const router = useRouter();

  const supabase = createClient();

  const [checking, setChecking] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [businessName, setBusinessName] =
    useState("");

  const [businessEmail, setBusinessEmail] =
    useState("");

  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [gstin, setGstin] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [businessType, setBusinessType] =
    useState("");

  // CHECK BUSINESS
  useEffect(() => {

    async function checkBusiness() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {

        router.push("/login");

        return;
      }

      const {
        data: business,
      } = await supabase
        .from("businesses")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (business) {

        router.push("/dashboard");

        return;
      }

      setChecking(false);
    }

    checkBusiness();

  }, [router, supabase]);

  // HANDLE SUBMIT
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {

        router.push("/login");

        return;
      }

      const { error } =
        await supabase
          .from("businesses")
          .insert({
            user_id: user.id,
            business_name: businessName,
            business_email: businessEmail,
            phone_number: phoneNumber,
            gstin,
            address,
            business_type: businessType,
            currency: "INR",
          });

      if (error) {

        console.error(error);

        setError(error.message);

        setLoading(false);

        return;
      }

      router.push("/dashboard");

      router.refresh();

    } catch (err) {

      console.error(err);

      setError("Something went wrong");

    } finally {

      setLoading(false);
    }
  }

  // LOADING
  if (checking) {

    return (

      <main
        className="flex min-h-screen items-center justify-center bg-[#f6f8ff]">

        <div className="text-center">

          <div
            className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-blue-500/20 border-t-blue-600"
          />

          <p
            className="mt-5 text-sm font-medium text-gray-500"
          >
            Loading workspace...
          </p>

        </div>

      </main>
    );
  }

  return (

    <main
      className="relative min-h-screen overflow-hidden bg-[#f6f8ff] px-4 py-10 sm:px-6 lg:px-8">

      {/* BG */}
      <div
        className="absolute left-0 top-0 h-[350px] w-[350px] rounded-full bg-blue-500/10 blur-3xl"
      />

      <div
        className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-violet-500/10 blur-3xl"
      />

      <div
        className="relative z-10 mx-auto max-w-4xl">

        {/* HEADER */}
        <div className="text-center">

          <div
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-blue-600 via-violet-500 to-cyan-400 shadow-2xl shadow-blue-500/20"
          >

            <Building2
              size={38}
              className="text-white"
            />

          </div>

          <h1
            className="mt-8 text-4xl font-black tracking-tight text-[#0f172a] sm:text-5xl"
          >
            Setup Your Organization
          </h1>

          <p
            className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg"
          >
            Configure your enterprise workspace
            to continue using NXTInvoice®.
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mt-12 rounded-[36px] border border-black/5 bg-white/80 p-6 shadow-[0_0_80px_rgba(59,130,246,0.08)] backdrop-blur-2xl sm:p-10">

          {error && (

            <div
              className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-500"
            >
              {error}
            </div>

          )}

          <div
            className="grid gap-6 md:grid-cols-2">

            {/* BUSINESS NAME */}
            <div>

              <label
                className="mb-3 block text-sm font-semibold text-gray-700"
              >
                Business Name
              </label>

              <input
                type="text"
                required
                value={businessName}
                onChange={(e) =>
                  setBusinessName(e.target.value)
                }
                placeholder="Your Business Name"
                className="h-14 w-full rounded-2xl border border-black/10 bg-white px-5 text-[15px] outline-none transition-all focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/10"
              />

            </div>

            {/* EMAIL */}
            <div>

              <label
                className="mb-3 block text-sm font-semibold text-gray-700"
              >
                Business Email
              </label>

              <input
                type="email"
                value={businessEmail}
                onChange={(e) =>
                  setBusinessEmail(e.target.value)
                }
                placeholder="business@example.com"
                className="h-14 w-full rounded-2xl border border-black/10 bg-white px-5 text-[15px] outline-none transition-all focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/10"
              />

            </div>

            {/* PHONE */}
            <div>

              <label
                className="mb-3 block text-sm font-semibold text-gray-700"
              >
                Phone Number
              </label>

              <input
                type="text"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value)
                }
                placeholder="+91 9876543210"
                className="h-14 w-full rounded-2xl border border-black/10 bg-white px-5 text-[15px] outline-none transition-all focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/10"
              />

            </div>

            {/* GSTIN */}
            <div>

              <label
                className="mb-3 block text-sm font-semibold text-gray-700"
              >
                GSTIN
              </label>

              <input
                type="text"
                value={gstin}
                onChange={(e) =>
                  setGstin(e.target.value)
                }
                placeholder="22AAAAA0000A1Z5"
                className="h-14 w-full rounded-2xl border border-black/10 bg-white px-5 text-[15px] outline-none transition-all focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/10"
              />

            </div>

            {/* ADDRESS */}
            <div className="md:col-span-2">

              <label
                className="mb-3 block text-sm font-semibold text-gray-700"
              >
                Business Address
              </label>

              <textarea
                rows={4}
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                placeholder="Business Address"
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-[15px] outline-none transition-all focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/10"
              />

            </div>

            {/* BUSINESS TYPE */}
            <div className="md:col-span-2">

              <label
                className="mb-3 block text-sm font-semibold text-gray-700"
              >
                Business Type
              </label>

              <select
                required
                value={businessType}
                onChange={(e) =>
                  setBusinessType(e.target.value)
                }
                className="h-14 w-full rounded-2xl border border-black/10 bg-white px-5 text-[15px] outline-none transition-all focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/10"
              >

                <option value="">
                  Select Business Type
                </option>

                <option value="Medical Store">
                  Medical Store
                </option>

                <option value="Travel Agency">
                  Travel Agency
                </option>

                <option value="Retail Business">
                  Retail Business
                </option>

                <option value="Service Company">
                  Service Company
                </option>

                <option value="Enterprise">
                  Enterprise
                </option>

                <option value="Others">
                  Others
                </option>

              </select>

            </div>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="group mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 text-base font-semibold text-white shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.01]"
          >

            {loading
              ? "Creating Workspace..."
              : "Continue to Dashboard"}

            {!loading && (

              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />

            )}

          </button>

        </form>

      </div>

    </main>
  );
}
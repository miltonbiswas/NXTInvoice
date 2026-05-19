"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { ArrowRight } from "lucide-react";

import { createClient }
from "@/utils/supabase/client";

const supabase = createClient();

export default function SetupPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [businessName, setBusinessName] =
    useState("");

  const [businessEmail, setBusinessEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [businessType, setBusinessType] =
    useState("");

  async function handleSetup(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    setLoading(true);

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    // Create organization
    const { data: organization, error } =
      await supabase
        .from("organizations")
        .insert({
          owner_id: user.id,

          business_name: businessName,

          business_email: businessEmail,

          phone,

          business_type: businessType,
        })
        .select()
        .single();

    if (error || !organization) {

      console.error(error);

      setLoading(false);

      return;
    }

    // Update profile
    await supabase
      .from("profiles")
      .update({
        onboarding_completed: true,

        organization_id:
          organization.id,

        role: "owner",
      })
      .eq("id", user.id);

    // Redirect dashboard
    router.push("/dashboard");

    setLoading(false);
  }

  return (

    <main className="min-h-screen bg-[#f6f8ff] px-6 py-16">

      <div className="mx-auto max-w-3xl">

        {/* Heading */}
        <div>

          <h1 className="text-5xl font-black tracking-tight text-[#0f172a]">

            Setup Your Organization

          </h1>

          <p className="mt-4 text-lg text-gray-600">

            Configure your business workspace
            to continue using NXTInvoice®.

          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSetup}
          className=" mt-12 rounded-[32px] border border-black/10 bg-white/70 p-8 shadow-[0_0_80px_rgba(59,130,246,0.08)] backdrop-blur-2xl">

          <div className="grid gap-6">

            {/* Business Name */}
            <div>

              <label className="mb-3 block text-sm font-medium text-gray-700">

                Business Name

              </label>

              <input
                type="text"
                required
                value={businessName}
                onChange={(e) =>
                  setBusinessName(
                    e.target.value
                  )
                }
                placeholder="Your Business Name"
                className=" h-14  w-full rounded-2xl border border-black/10 bg-white px-5  outline-none"/>

            </div>

            {/* Business Email */}
            <div>

              <label className="mb-3 block text-sm font-medium text-gray-700">

                Business Email

              </label>

              <input
                type="email"
                required
                value={businessEmail}
                onChange={(e) =>
                  setBusinessEmail(
                    e.target.value
                  )
                }
                placeholder="business@example.com"
                className="h-14 w-full rounded-2xl border border-black/10 bg-white  px-5 outline-none "/>

            </div>

            {/* Phone */}
            <div>

              <label className="mb-3 block text-sm font-medium text-gray-700">

                Phone Number

              </label>

              <input
                type="text"
                required
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
                placeholder="+91 9876543210"
                className=" h-14 w-full rounded-2xl border border-black/10 bg-white px-5  outline-none"/>

            </div>

            {/* Business Type */}
            <div>

              <label className="mb-3 block text-sm font-medium text-gray-700">

                Business Type

              </label>

              <select
                required
                value={businessType}
                onChange={(e) =>
                  setBusinessType(
                    e.target.value
                  )
                }
                className=" h-14 w-full rounded-2xl  border border-black/10 bg-white px-5 outline-none">

                <option value="">
                  Select Business Type
                </option>

                <option>
                  Travel Agency
                </option>

                <option>
                  Medical Store
                </option>

                <option>
                  Retail Business
                </option>

                <option>
                  Service Company
                </option>

                <option>
                  Enterprise
                </option>
                <option>
                  Others
                </option>
              </select>

            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="group mt-4 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 text-lg font-semibold text-white">

              {loading
                ? "Creating Workspace..."
                : "Continue to Dashboard"}

              {!loading && (

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"/>

              )}

            </button>

          </div>

        </form>

      </div>

    </main>
  );
}
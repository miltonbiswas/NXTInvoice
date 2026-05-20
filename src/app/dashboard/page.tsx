import Link from "next/link";

import {
  IndianRupee,
  FileText,
  Users,
  CreditCard,
  ArrowRight,
  TrendingUp,
  Activity,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col gap-5 rounded-[28px] border border-black/5 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-3xl font-black text-[#0f172a] sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Monitor invoices, payments, revenue and analytics.
          </p>

        </div>

        <Link
          href="/dashboard/invoices/create"
          className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 px-7 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.01]"
        >
          Create Invoice

          <ArrowRight size={18} />
        </Link>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-4">

        {/* REVENUE */}
        <div className="rounded-[30px] border border-black/5 bg-white p-6 shadow-sm">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Total Revenue
              </p>

              <h2 className="mt-4 text-4xl font-black text-[#0f172a] xl:text-5xl">
                ₹0
              </h2>

            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-400 text-white">

              <IndianRupee size={30} />

            </div>

          </div>

        </div>

        {/* INVOICES */}
        <div className="rounded-[30px] border border-black/5 bg-white p-6 shadow-sm">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Invoices
              </p>

              <h2 className="mt-4 text-4xl font-black text-[#0f172a] xl:text-5xl">
                0
              </h2>

            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-violet-500 to-pink-400 text-white">

              <FileText size={30} />

            </div>

          </div>

        </div>

        {/* CLIENTS */}
        <div className="rounded-[30px] border border-black/5 bg-white p-6 shadow-sm">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Clients
              </p>

              <h2 className="mt-4 text-4xl font-black text-[#0f172a] xl:text-5xl">
                0
              </h2>

            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white">

              <Users size={30} />

            </div>

          </div>

        </div>

        {/* PENDING */}
        <div className="rounded-[30px] border border-black/5 bg-white p-6 shadow-sm">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Pending Payments
              </p>

              <h2 className="mt-4 text-4xl font-black text-[#0f172a] xl:text-5xl">
                ₹0
              </h2>

            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-orange-400 to-yellow-400 text-white">

              <CreditCard size={30} />

            </div>

          </div>

        </div>

      </div>

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.6fr_.8fr]">

        {/* RECENT */}
        <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-black text-[#0f172a] sm:text-3xl">
                Recent Invoices
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Latest generated invoices will appear here.
              </p>

            </div>

            <button className="rounded-xl bg-[#f4f7ff] px-4 py-2 text-sm font-semibold text-blue-600">

              View All

            </button>

          </div>

          <div className="mt-6 flex min-h-[320px] items-center justify-center rounded-[28px] border border-dashed border-black/10 bg-[#f8faff]">

            <div className="text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white">

                <FileText size={34} />

              </div>

              <h3 className="mt-5 text-2xl font-black text-[#0f172a]">
                No invoices yet
              </h3>

              <p className="mt-2 text-gray-500">
                Create your first invoice to start analytics.
              </p>

            </div>

          </div>

        </div>

        {/* SIDE ANALYTICS */}
        <div className="space-y-5">

          {/* ACTIVITY */}
          <div className="rounded-[30px] border border-black/5 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 text-white">

                <TrendingUp size={24} />

              </div>

              <div>

                <h3 className="text-xl font-black text-[#0f172a]">
                  Growth
                </h3>

                <p className="text-sm text-gray-500">
                  Revenue insights
                </p>

              </div>

            </div>

            <div className="mt-6 h-[220px] rounded-[24px] bg-[#f8faff]" />

          </div>

          {/* LIVE */}
          <div className="rounded-[30px] border border-black/5 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 to-pink-400 text-white">

                <Activity size={24} />

              </div>

              <div>

                <h3 className="text-xl font-black text-[#0f172a]">
                  Activity
                </h3>

                <p className="text-sm text-gray-500">
                  Real-time updates
                </p>

              </div>

            </div>

            <div className="mt-6 h-[160px] rounded-[24px] bg-[#f8faff]" />

          </div>

        </div>

      </div>

    </div>
  );
}
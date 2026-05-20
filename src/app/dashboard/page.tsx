"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import dayjs from "dayjs";

import {
  ArrowRight,
  CreditCard,
  FileText,
  IndianRupee,
  Users,
} from "lucide-react";

import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

type DashboardStats = {
  totalRevenue: number;
  totalInvoices: number;
  totalClients: number;
  pendingInvoices: number;
};

export default function DashboardPage() {

  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState<DashboardStats>({
      totalRevenue: 0,
      totalInvoices: 0,
      totalClients: 0,
      pendingInvoices: 0,
    });

  const [recentInvoices, setRecentInvoices] =
    useState<any[]>([]);

  async function fetchDashboard() {

    try {

      setLoading(true);

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      const {
        data: invoices,
      } = await supabase
        .from("invoices")
        .select(`
          *,
          clients (
            client_name
          )
        `)
        .eq("business_id", user.id);

      const {
        data: clients,
      } = await supabase
        .from("clients")
        .select("*")
        .eq("business_id", user.id);

      const totalRevenue =
        invoices?.reduce(
          (acc, invoice) =>
            acc +
            Number(
              invoice.grand_total
            ),
          0
        ) || 0;

      const pendingInvoices =
        invoices?.filter(
          (invoice) =>
            invoice.status !==
            "paid"
        ).length || 0;

      setStats({
        totalRevenue,
        totalInvoices:
          invoices?.length || 0,
        totalClients:
          clients?.length || 0,
        pendingInvoices,
      });

      setRecentInvoices(
        invoices
          ?.sort(
            (a, b) =>
              new Date(
                b.created_at
              ).getTime() -
              new Date(
                a.created_at
              ).getTime()
          )
          .slice(0, 5) || []
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {

    fetchDashboard();

  }, []);

  const cards = [
    {
      title: "Total Revenue",
      value: `₹ ${stats.totalRevenue.toFixed(2)}`,
      icon: IndianRupee,
      gradient:
        "from-blue-600 via-violet-500 to-cyan-400",
    },
    {
      title: "Invoices",
      value: stats.totalInvoices,
      icon: FileText,
      gradient:
        "from-violet-600 via-fuchsia-500 to-pink-400",
    },
    {
      title: "Clients",
      value: stats.totalClients,
      icon: Users,
      gradient:
        "from-cyan-600 via-sky-500 to-blue-400",
    },
    {
      title: "Pending",
      value: stats.pendingInvoices,
      icon: CreditCard,
      gradient:
        "from-orange-500 via-amber-500 to-yellow-400",
    },
  ];

  return (

    <div className="space-y-8">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-black tracking-tight text-[#0f172a]">

            Dashboard

          </h1>

          <p className="mt-3 text-gray-500">

            Monitor invoices, revenue and business analytics.

          </p>

        </div>

        <Link
          href="/dashboard/invoices/create"
          className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 px-6 font-semibold text-white shadow-lg shadow-blue-500/20"
        >

          Create Invoice

          <ArrowRight size={18} />

        </Link>

      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        {cards.map((card, index) => {

          const Icon = card.icon;

          return (

            <div
              key={index}
              className="overflow-hidden rounded-[32px] border border-black/5 bg-white shadow-sm"
            >

              <div className={`h-2 bg-gradient-to-r ${card.gradient}`} />

              <div className="p-6">

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-sm font-medium text-gray-500">

                      {card.title}

                    </p>

                    <h2 className="mt-4 text-4xl font-black tracking-tight text-[#0f172a]">

                      {loading
                        ? "--"
                        : card.value}

                    </h2>

                  </div>

                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${card.gradient}`}>

                    <Icon
                      size={24}
                      className="text-white"
                    />

                  </div>

                </div>

              </div>

            </div>
          );
        })}

      </div>

      <div className="rounded-[32px] border border-black/5 bg-white p-8 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-black text-[#0f172a]">

              Recent Invoices

            </h2>

            <p className="mt-2 text-gray-500">

              Latest generated invoices.

            </p>

          </div>

          <Link
            href="/dashboard/invoices"
            className="text-sm font-semibold text-blue-600"
          >

            View All

          </Link>

        </div>

        <div className="mt-8 space-y-5">

          {recentInvoices.length === 0 ? (

            <div className="rounded-[24px] border border-dashed border-black/10 p-12 text-center">

              <h3 className="text-xl font-black text-[#0f172a]">

                No invoices yet

              </h3>

              <p className="mt-3 text-gray-500">

                Create your first invoice to start tracking analytics.

              </p>

            </div>

          ) : (

            recentInvoices.map((invoice) => (

              <Link
                key={invoice.id}
                href={`/dashboard/invoices/${invoice.id}`}
                className="block rounded-[28px] border border-black/5 bg-[#f8fafc] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                  <div>

                    <h3 className="text-xl font-black text-[#0f172a]">

                      {invoice.invoice_number}

                    </h3>

                    <p className="mt-2 text-gray-500">

                      {invoice.clients?.client_name}

                    </p>

                  </div>

                  <div className="flex flex-col items-start gap-2 lg:items-end">

                    <div className="text-2xl font-black text-blue-600">

                      ₹ {Number(invoice.grand_total).toFixed(2)}

                    </div>

                    <div className="text-sm text-gray-400">

                      {dayjs(invoice.issue_date).format("DD MMM YYYY")}

                    </div>

                  </div>

                </div>

              </Link>
            ))
          )}

        </div>

      </div>

    </div>
  );
}
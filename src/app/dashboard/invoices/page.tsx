"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import dayjs from "dayjs";

import { Plus, Search, Printer } from "lucide-react";

import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

type Invoice = {
  id: string;
  invoice_number: string;
  issue_date: string;
  grand_total: number;
  status: string;
  clients?: {
    client_name: string;
  };
};

export default function InvoicesPage() {

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [invoices, setInvoices] =
    useState<Invoice[]>([]);

  async function fetchInvoices() {

    try {

      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } =
        await supabase
          .from("invoices")
          .select(`
            *,
            clients (
              client_name
            )
          `)
          .eq("business_id", user.id)
          .order("created_at", {
            ascending: false,
          });

      if (error) {

        console.error(error);

        return;
      }

      setInvoices(data || []);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {

    fetchInvoices();

  }, []);

  const filteredInvoices =
    invoices.filter((invoice) => {

      const value =
        search.toLowerCase();

      return (
        invoice.invoice_number
          .toLowerCase()
          .includes(value) ||

        invoice.clients?.client_name
          ?.toLowerCase()
          .includes(value)
      );
    });

  return (

    <div className="space-y-8">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-3xl font-black text-[#0f172a]">

            Invoices

          </h1>

          <p className="mt-2 text-gray-500">

            Manage all invoices and billing records.

          </p>

        </div>

        <Link
          href="/dashboard/invoices/create"
          className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 px-6 font-semibold text-white"
        >

          <Plus size={18} />

          Create Invoice

        </Link>

      </div>

      <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm">

        <div className="relative">

          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search invoice..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="h-14 w-full rounded-2xl border border-black/10 bg-[#f8fafc] pl-12 pr-4 outline-none"
          />

        </div>

      </div>

      {loading ? (

        <div className="rounded-[32px] border border-black/5 bg-white p-10 text-center shadow-sm">

          Loading invoices...

        </div>

      ) : filteredInvoices.length === 0 ? (

        <div className="rounded-[32px] border border-dashed border-black/10 bg-white p-16 text-center shadow-sm">

          <h2 className="text-2xl font-black text-[#0f172a]">

            No invoices found

          </h2>

          <p className="mt-3 text-gray-500">

            Create your first invoice.

          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {filteredInvoices.map((invoice) => (

            <div
              key={invoice.id}
              className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm"
            >

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <div className="flex flex-wrap items-center gap-3">

                    <h2 className="text-2xl font-black text-[#0f172a]">

                      {invoice.invoice_number}

                    </h2>

                    <div className={`rounded-full px-4 py-1 text-xs font-bold ${invoice.status === "paid"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-700"
                      }`}>

                      {invoice.status}

                    </div>

                  </div>

                  <p className="mt-2 text-gray-500">

                    {invoice.clients?.client_name}

                  </p>

                </div>

                <div className="flex flex-col items-start gap-4 lg:items-end">

                  <div>

                    <div className="text-3xl font-black text-blue-600">

                      ₹ {Number(invoice.grand_total).toFixed(2)}

                    </div>

                    <div className="mt-1 text-sm text-gray-400">

                      {dayjs(invoice.issue_date).format("DD MMM YYYY")}

                    </div>

                  </div>

                  <div className="flex gap-3">

                    <Link
                      href={`/dashboard/invoices/${invoice.id}`}
                      className="flex h-11 items-center gap-2 rounded-2xl border border-black/10 bg-white px-5 text-sm font-semibold"
                    >

                      View

                    </Link>

                    <Link
                      href={`/dashboard/invoices/${invoice.id}`}
                      className="flex h-11 items-center gap-2 rounded-2xl bg-[#0f172a] px-5 text-sm font-semibold text-white"
                    >

                      <Printer size={16} />

                      Print

                    </Link>

                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>

      )}

    </div>
  );
}
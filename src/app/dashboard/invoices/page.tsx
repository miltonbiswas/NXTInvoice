"use client";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import {
  Eye,
  FileText,
  IndianRupee,
  Plus,
  Printer,
  Search,
  Trash2,
} from "lucide-react";

import { createClient } from "@/utils/supabase/client";

type Invoice = {
  id: string;

  invoice_number: string;

  client_name: string;

  issue_date: string;

  grand_total: number;

  status: string;

  currency: string;

  created_at: string;
};

export default function InvoicesPage() {
  const router = useRouter();

  const supabase = createClient();

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    loadInvoices();
  }, []);

  async function loadInvoices() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");

      return;
    }

    const { data: business } = await supabase
      .from("businesses")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!business) {
      router.push("/setup");

      return;
    }

    const { data } = await supabase
      .from("invoices")
      .select("*")
      .eq("business_id", business.id)
      .order("created_at", {
        ascending: false,
      });

    setInvoices(data || []);

    setLoading(false);
  }

  async function deleteInvoice(id: string) {
    const confirmDelete = confirm(
      "Delete this invoice?"
    );

    if (!confirmDelete) return;

    await supabase
      .from("invoices")
      .delete()
      .eq("id", id);

    loadInvoices();
  }

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      return (
        invoice.invoice_number
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        invoice.client_name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [search, invoices]);

  return (
    <div className="min-h-screen bg-[#eef3ff]">

      {/* TOPBAR */}

      <div className="sticky top-0 z-30 border-b border-black/5 bg-white/90 backdrop-blur-xl">

        <div className="flex flex-col gap-4 px-4 py-5 xl:flex-row xl:items-center xl:justify-between">

          <div>

            <h1 className="text-4xl font-black text-[#0f172a]">
              Invoices
            </h1>

            <p className="mt-1 text-gray-500">
              Manage all generated invoices
            </p>

          </div>

          <Link
            href="/dashboard/invoices/create"
            className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 px-6 font-semibold text-white shadow-lg"
          >
            <Plus size={18} />

            Create Invoice
          </Link>

        </div>

      </div>

      {/* CONTENT */}

      <div className="px-4 py-5">

        {/* SEARCH */}

        <div className="mb-5 rounded-[28px] bg-white p-5 shadow-sm">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              placeholder="Search invoice number or client..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="h-14 w-full rounded-2xl border border-black/10 pl-12 pr-4 outline-none focus:border-blue-500"
            />

          </div>

        </div>

        {/* TABLE */}

        <div className="overflow-hidden rounded-[30px] bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[950px]">

              <thead className="bg-[#f8faff]">

                <tr>

                  <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                    Invoice
                  </th>

                  <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                    Client
                  </th>

                  <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                    Date
                  </th>

                  <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                    Amount
                  </th>

                  <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-5 text-right text-xs font-black uppercase tracking-wider text-gray-500">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan={6}
                      className="px-6 py-20 text-center text-gray-500"
                    >
                      Loading invoices...
                    </td>

                  </tr>

                ) : filteredInvoices.length === 0 ? (

                  <tr>

                    <td
                      colSpan={6}
                      className="px-6 py-20 text-center"
                    >

                      <div className="flex flex-col items-center">

                        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white">

                          <FileText size={34} />

                        </div>

                        <h3 className="text-2xl font-black text-[#0f172a]">
                          No invoices found
                        </h3>

                        <p className="mt-2 text-gray-500">
                          Create your first invoice
                        </p>

                      </div>

                    </td>

                  </tr>

                ) : (

                  filteredInvoices.map((invoice) => (

                    <tr
                      key={invoice.id}
                      className="border-t border-black/5"
                    >

                      <td className="px-6 py-5">

                        <div>

                          <p className="font-black text-[#0f172a]">
                            {invoice.invoice_number}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {new Date(
                              invoice.created_at
                            ).toLocaleString()}
                          </p>

                        </div>

                      </td>

                      <td className="px-6 py-5">

                        <p className="font-semibold text-[#0f172a]">
                          {invoice.client_name ||
                            "Walk-in Client"}
                        </p>

                      </td>

                      <td className="px-6 py-5 text-gray-600">

                        {invoice.issue_date}

                      </td>

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-1 font-black text-[#0f172a]">

                          <IndianRupee size={16} />

                          {Number(
                            invoice.grand_total
                          ).toFixed(2)}

                        </div>

                      </td>

                      <td className="px-6 py-5">

                        <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold uppercase text-emerald-600">

                          {invoice.status}

                        </span>

                      </td>

                      <td className="px-6 py-5">

                        <div className="flex items-center justify-end gap-2">

                          <Link
                            href={`/dashboard/invoices/${invoice.id}`}
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white"
                          >

                            <Eye size={18} />

                          </Link>

                          <button
                            onClick={() =>
                              window.print()
                            }
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white"
                          >

                            <Printer size={18} />

                          </button>

                          <button
                            onClick={() =>
                              deleteInvoice(
                                invoice.id
                              )
                            }
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-500"
                          >

                            <Trash2 size={18} />

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}
"use client";

import { useEffect, useMemo, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  Building2,
  Download,
  FileText,
  Printer,
  User2,
} from "lucide-react";

import { createClient } from "@/utils/supabase/client";

type Invoice = {
  id: string;

  invoice_number: string;

  issue_date: string;

  due_date: string;

  po_number: string;

  client_name: string;

  client_email: string;

  client_phone: string;

  billing_address: string;

  subtotal: number;

  total_tax: number;

  total_discount: number;

  grand_total: number;

  notes: string;

  currency: string;

  status: string;
};

type InvoiceItem = {
  id: string;

  item_name: string;

  description: string;

  batch_number: string;

  expiry_date: string;

  quantity: number;

  unit_price: number;

  tax_rate: number;

  discount_rate: number;

  line_total: number;
};

type Business = {
  business_name: string;

  business_email: string;

  phone_number: string;

  gstin: string;

  address: string;
};

export default function InvoiceViewPage() {
  const params = useParams();

  const router = useRouter();

  const supabase = createClient();

  const [loading, setLoading] =
    useState(true);

  const [invoice, setInvoice] =
    useState<Invoice | null>(null);

  const [items, setItems] = useState<
    InvoiceItem[]
  >([]);

  const [business, setBusiness] =
    useState<Business | null>(null);

  useEffect(() => {
    loadInvoice();
  }, []);

  async function loadInvoice() {
    setLoading(true);

    const invoiceId = params.id;

    const { data: invoiceData } =
      await supabase
        .from("invoices")
        .select("*")
        .eq("id", invoiceId)
        .single();

    if (!invoiceData) {
      router.push("/dashboard/invoices");

      return;
    }

    setInvoice(invoiceData);

    const { data: businessData } =
      await supabase
        .from("businesses")
        .select("*")
        .eq(
          "id",
          invoiceData.business_id
        )
        .single();

    setBusiness(businessData);

    const { data: itemsData } =
      await supabase
        .from("invoice_items")
        .select("*")
        .eq("invoice_id", invoiceId);

    setItems(itemsData || []);

    setLoading(false);
  }

  function handlePrint() {
    window.print();
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#eef3ff]">

        <p className="text-lg font-semibold text-gray-500">
          Loading invoice...
        </p>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eef3ff] print:bg-white">

      {/* TOPBAR */}

      <div className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur-xl print:hidden">

        <div className="flex flex-col gap-4 px-4 py-5 xl:flex-row xl:items-center xl:justify-between">

          <div>

            <h1 className="text-3xl font-black text-[#0f172a]">
              Invoice Details
            </h1>

            <p className="mt-1 text-gray-500">
              View & print invoice
            </p>

          </div>

          <div className="flex flex-wrap items-center gap-3">

            <button
              onClick={() =>
                router.back()
              }
              className="flex h-12 items-center gap-2 rounded-2xl border border-black/10 bg-white px-5 font-semibold"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <button
              onClick={handlePrint}
              className="flex h-12 items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 px-6 font-semibold text-white shadow-lg"
            >
              <Printer size={18} />
              Print Invoice
            </button>

          </div>

        </div>

      </div>

      {/* INVOICE */}

      <div className="mx-auto max-w-[1400px] px-4 py-5">

        <div className="rounded-[36px] bg-white p-6 shadow-sm print:rounded-none print:shadow-none">

          {/* HEADER */}

          <div className="grid grid-cols-1 gap-8 border-b border-dashed border-black/10 pb-8 xl:grid-cols-2">

            {/* BUSINESS */}

            <div>

              <div className="mb-5 flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 text-white">

                  <Building2 size={30} />

                </div>

                <div>

                  <h2 className="text-3xl font-black text-[#0f172a]">
                    {
                      business?.business_name
                    }
                  </h2>

                  <p className="text-gray-500">
                    Invoice Generator
                  </p>

                </div>

              </div>

              <div className="space-y-2 text-gray-600">

                <p>
                  {
                    business?.business_email
                  }
                </p>

                <p>
                  {
                    business?.phone_number
                  }
                </p>

                <p>
                  GSTIN:{" "}
                  {business?.gstin}
                </p>

                <p>
                  {business?.address}
                </p>

              </div>

            </div>

            {/* INVOICE INFO */}

            <div className="xl:text-right">

              <h1 className="text-5xl font-black text-[#0f172a]">
                INVOICE
              </h1>

              <div className="mt-6 space-y-2 text-gray-600">

                <p>
                  Invoice No:{" "}
                  <span className="font-bold text-[#0f172a]">
                    {
                      invoice?.invoice_number
                    }
                  </span>
                </p>

                <p>
                  Issue Date:{" "}
                  {
                    invoice?.issue_date
                  }
                </p>

                <p>
                  Due Date:{" "}
                  {invoice?.due_date ||
                    "-"}
                </p>

                <p>
                  PO Number:{" "}
                  {invoice?.po_number ||
                    "-"}
                </p>

              </div>

            </div>

          </div>

          {/* CLIENT */}

          <div className="mt-8 rounded-[28px] bg-[#f8faff] p-6">

            <div className="mb-5 flex items-center gap-3">

              <User2
                size={24}
                className="text-blue-600"
              />

              <h2 className="text-2xl font-black text-[#0f172a]">
                Bill To
              </h2>

            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

              <div>

                <p className="text-xs font-bold uppercase text-gray-500">
                  Client Name
                </p>

                <p className="mt-2 font-semibold text-[#0f172a]">
                  {invoice?.client_name ||
                    "-"}
                </p>

              </div>

              <div>

                <p className="text-xs font-bold uppercase text-gray-500">
                  Email
                </p>

                <p className="mt-2 font-semibold text-[#0f172a]">
                  {invoice?.client_email ||
                    "-"}
                </p>

              </div>

              <div>

                <p className="text-xs font-bold uppercase text-gray-500">
                  Phone
                </p>

                <p className="mt-2 font-semibold text-[#0f172a]">
                  {invoice?.client_phone ||
                    "-"}
                </p>

              </div>

              <div>

                <p className="text-xs font-bold uppercase text-gray-500">
                  Address
                </p>

                <p className="mt-2 font-semibold text-[#0f172a]">
                  {invoice?.billing_address ||
                    "-"}
                </p>

              </div>

            </div>

          </div>

          {/* ITEMS */}

          <div className="mt-8 overflow-hidden rounded-[28px] border border-black/5">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[950px]">

                <thead className="bg-[#f8faff]">

                  <tr>

                    {[
                      "Item",
                      "Batch",
                      "Expiry",
                      "Qty",
                      "Price",
                      "Tax %",
                      "Discount %",
                      "Total",
                    ].map((title) => (
                      <th
                        key={title}
                        className="px-5 py-5 text-left text-xs font-black uppercase tracking-wider text-gray-500"
                      >
                        {title}
                      </th>
                    ))}

                  </tr>

                </thead>

                <tbody>

                  {items.map((item) => (

                    <tr
                      key={item.id}
                      className="border-t border-black/5"
                    >

                      <td className="px-5 py-5">

                        <div>

                          <p className="font-black text-[#0f172a]">
                            {
                              item.item_name
                            }
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {
                              item.description
                            }
                          </p>

                        </div>

                      </td>

                      <td className="px-5 py-5">
                        {
                          item.batch_number
                        }
                      </td>

                      <td className="px-5 py-5">
                        {
                          item.expiry_date
                        }
                      </td>

                      <td className="px-5 py-5">
                        {item.quantity}
                      </td>

                      <td className="px-5 py-5">
                        ₹
                        {Number(
                          item.unit_price
                        ).toFixed(2)}
                      </td>

                      <td className="px-5 py-5">
                        {item.tax_rate}%
                      </td>

                      <td className="px-5 py-5">
                        {
                          item.discount_rate
                        }
                        %
                      </td>

                      <td className="px-5 py-5 font-black text-[#0f172a]">

                        ₹
                        {Number(
                          item.line_total
                        ).toFixed(2)}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* TOTALS */}

          <div className="mt-8 flex justify-end">

            <div className="w-full rounded-[28px] bg-[#f8faff] p-6 xl:w-[450px]">

              <div className="space-y-5">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-black">
                    ₹
                    {Number(
                      invoice?.subtotal
                    ).toFixed(2)}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Tax
                  </span>

                  <span className="font-black">
                    ₹
                    {Number(
                      invoice?.total_tax
                    ).toFixed(2)}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Discount
                  </span>

                  <span className="font-black">
                    ₹
                    {Number(
                      invoice?.total_discount
                    ).toFixed(2)}
                  </span>

                </div>

                <div className="border-t border-dashed border-black/10 pt-5">

                  <div className="flex items-center justify-between">

                    <span className="text-3xl font-black text-[#0f172a]">
                      Grand Total
                    </span>

                    <span className="text-4xl font-black text-blue-600">

                      ₹
                      {Number(
                        invoice?.grand_total
                      ).toFixed(2)}

                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* NOTES */}

          {invoice?.notes && (
            <div className="mt-8 rounded-[28px] bg-[#f8faff] p-6">

              <h2 className="text-2xl font-black text-[#0f172a]">
                Notes
              </h2>

              <p className="mt-4 whitespace-pre-wrap text-gray-600">
                {invoice.notes}
              </p>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
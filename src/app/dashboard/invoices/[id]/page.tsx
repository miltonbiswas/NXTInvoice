"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import dayjs from "dayjs";

import Link from "next/link";

import { ArrowLeft, Printer } from "lucide-react";

import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function InvoiceViewPage() {

  const params = useParams();

  const id = params.id as string;

  const [invoice, setInvoice] =
    useState<any>(null);

  const [items, setItems] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function fetchInvoice() {

    try {

      setLoading(true);

      const { data, error } =
        await supabase
          .from("invoices")
          .select(`
            *,
            businesses (*),
            clients (*)
          `)
          .eq("id", id)
          .single();

      if (error) {

        console.error(error);

        return;
      }

      setInvoice(data);

      const { data: itemsData } =
        await supabase
          .from("invoice_items")
          .select("*")
          .eq("invoice_id", id);

      setItems(itemsData || []);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {

    fetchInvoice();

  }, []);

  if (loading) {

    return (

      <div className="rounded-[32px] border border-black/5 bg-white p-10 text-center shadow-sm">

        Loading invoice...

      </div>
    );
  }

  if (!invoice) {

    return (

      <div className="rounded-[32px] border border-black/5 bg-white p-10 text-center shadow-sm">

        Invoice not found.

      </div>
    );
  }

  return (

    <div className="space-y-8">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-4">

          <Link
            href="/dashboard/invoices"
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-white"
          >

            <ArrowLeft size={18} />

          </Link>

          <div>

            <h1 className="text-3xl font-black text-[#0f172a]">

              Invoice Preview

            </h1>

            <p className="mt-2 text-gray-500">

              {invoice.invoice_number}

            </p>

          </div>

        </div>

        <button
          onClick={() =>
            window.print()
          }
          className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 px-6 font-semibold text-white"
        >

          <Printer size={18} />

          Print Invoice

        </button>

      </div>

      <div className="mx-auto max-w-[900px] rounded-[32px] border border-black/5 bg-white p-10 shadow-sm">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

          <div>

            <h2 className="text-4xl font-black text-[#0f172a]">

              {invoice.businesses?.business_name}

            </h2>

            <div className="mt-5 space-y-2 text-gray-500">

              <p>
                {invoice.businesses?.business_email}
              </p>

              <p>
                {invoice.businesses?.phone_number}
              </p>

            </div>

          </div>

          <div className="text-left lg:text-right">

            <h1 className="text-5xl font-black text-blue-600">

              INVOICE

            </h1>

            <div className="mt-5 space-y-2 text-gray-500">

              <p>

                <span className="font-bold text-black">

                  Invoice No:

                </span>{" "}

                {invoice.invoice_number}

              </p>

              <p>

                <span className="font-bold text-black">

                  Issue Date:

                </span>{" "}

                {dayjs(invoice.issue_date).format("DD MMM YYYY")}

              </p>

              <p>

                <span className="font-bold text-black">

                  Due Date:

                </span>{" "}

                {dayjs(invoice.due_date).format("DD MMM YYYY")}

              </p>

            </div>

          </div>

        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">

          <div className="rounded-[24px] bg-[#f8fafc] p-6">

            <h3 className="text-lg font-black text-[#0f172a]">

              Bill To

            </h3>

            <div className="mt-4 space-y-2 text-gray-600">

              <p className="font-bold text-black">

                {invoice.clients?.client_name}

              </p>

              <p>
                {invoice.clients?.email}
              </p>

              <p>
                {invoice.clients?.phone}
              </p>

              <p>
                {invoice.clients?.billing_address}
              </p>

            </div>

          </div>

          <div className="rounded-[24px] bg-[#f8fafc] p-6">

            <h3 className="text-lg font-black text-[#0f172a]">

              Shipping Address

            </h3>

            <div className="mt-4 text-gray-600">

              {invoice.clients?.shipping_address || "N/A"}

            </div>

          </div>

        </div>

        <div className="mt-12 overflow-x-auto">

          <table className="w-full min-w-[900px] border-collapse">

            <thead>

              <tr className="border-b border-black/10 text-left">

                <th className="py-4 font-bold">
                  Item
                </th>

                <th className="py-4 font-bold">
                  Batch
                </th>

                <th className="py-4 font-bold">
                  Exp
                </th>

                <th className="py-4 font-bold">
                  Qty
                </th>

                <th className="py-4 font-bold">
                  Rate
                </th>

                <th className="py-4 font-bold">
                  Tax %
                </th>

                <th className="py-4 font-bold">
                  Discount %
                </th>

                <th className="py-4 font-bold text-right">
                  Total
                </th>

              </tr>

            </thead>

            <tbody>

              {items.map((item) => (

                <tr
                  key={item.id}
                  className="border-b border-black/5"
                >

                  <td className="py-5">
                    {item.item_name}
                  </td>

                  <td className="py-5">
                    {item.batch_number}
                  </td>

                  <td className="py-5">
                    {item.expiry_date}
                  </td>

                  <td className="py-5">
                    {item.quantity}
                  </td>

                  <td className="py-5">
                    ₹ {item.unit_price}
                  </td>

                  <td className="py-5">
                    {item.tax_rate}%
                  </td>

                  <td className="py-5">
                    {item.discount_rate}%
                  </td>

                  <td className="py-5 text-right font-bold">

                    ₹ {Number(item.total_amount).toFixed(2)}

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        <div className="mt-12 flex justify-end">

          <div className="w-full max-w-[400px] space-y-4 rounded-[24px] bg-[#f8fafc] p-6">

            <div className="flex items-center justify-between">

              <span className="text-gray-500">

                Subtotal

              </span>

              <span className="font-bold">

                ₹ {Number(invoice.subtotal).toFixed(2)}

              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-gray-500">

                Tax

              </span>

              <span className="font-bold">

                ₹ {Number(invoice.total_tax).toFixed(2)}

              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-gray-500">

                Discount

              </span>

              <span className="font-bold">

                ₹ {Number(invoice.total_discount).toFixed(2)}

              </span>

            </div>

            <div className="h-px bg-black/10" />

            <div className="flex items-center justify-between">

              <span className="text-xl font-black text-[#0f172a]">

                Grand Total

              </span>

              <span className="text-3xl font-black text-blue-600">

                ₹ {Number(invoice.grand_total).toFixed(2)}

              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
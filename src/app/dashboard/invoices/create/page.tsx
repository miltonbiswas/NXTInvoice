"use client";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import dayjs from "dayjs";

import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Printer,
  RotateCcw,
} from "lucide-react";

import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

type InvoiceItem = {
  item_name: string;
  description: string;
  batch_number: string;
  expiry_date: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
  discount_rate: number;
};

export default function CreateInvoicePage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [business, setBusiness] =
    useState<any>(null);

  const [invoiceNumber] = useState(
    `INV-${Date.now()}`
  );

  const [poNumber, setPoNumber] =
    useState("");

  const [issueDate, setIssueDate] =
    useState(
      dayjs().format("YYYY-MM-DD")
    );

  const [dueDate, setDueDate] =
    useState(
      dayjs()
        .add(7, "day")
        .format("YYYY-MM-DD")
    );

  const [clientName, setClientName] =
    useState("");

  const [clientEmail, setClientEmail] =
    useState("");

  const [clientPhone, setClientPhone] =
    useState("");

  const [
    billingAddress,
    setBillingAddress,
  ] = useState("");

  const [
    shippingAddress,
    setShippingAddress,
  ] = useState("");

  const [paymentTerms, setPaymentTerms] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [items, setItems] = useState<
    InvoiceItem[]
  >([
    {
      item_name: "",
      description: "",
      batch_number: "",
      expiry_date: "",
      quantity: 1,
      unit_price: 0,
      tax_rate: 0,
      discount_rate: 0,
    },
  ]);

  useEffect(() => {

    async function fetchBusiness() {

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {

        router.push("/login");

        return;
      }

      const { data } = await supabase
        .from("businesses")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (!data) {

        router.push("/setup");

        return;
      }

      setBusiness(data);
    }

    fetchBusiness();

  }, []);

  function addItem() {

    setItems([
      ...items,
      {
        item_name: "",
        description: "",
        batch_number: "",
        expiry_date: "",
        quantity: 1,
        unit_price: 0,
        tax_rate: 0,
        discount_rate: 0,
      },
    ]);
  }

  function removeItem(index: number) {

    const updated = [...items];

    updated.splice(index, 1);

    setItems(updated);
  }

  function updateItem(
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) {

    const updated = [...items];

    updated[index][field] =
      value as never;

    setItems(updated);
  }

  function calculateLineTotal(
    item: InvoiceItem
  ) {

    const base =
      item.quantity *
      item.unit_price;

    const discount =
      base *
      (item.discount_rate / 100);

    const tax =
      (base - discount) *
      (item.tax_rate / 100);

    return base + tax - discount;
  }

  const totals = useMemo(() => {

    let subtotal = 0;

    let totalTax = 0;

    let totalDiscount = 0;

    let grandTotal = 0;

    items.forEach((item) => {

      const base =
        item.quantity *
        item.unit_price;

      const discount =
        base *
        (item.discount_rate / 100);

      const tax =
        (base - discount) *
        (item.tax_rate / 100);

      subtotal += base;

      totalTax += tax;

      totalDiscount += discount;

      grandTotal +=
        calculateLineTotal(item);
    });

    return {
      subtotal,
      totalTax,
      totalDiscount,
      grandTotal,
    };

  }, [items]);

  async function handleSave(
    shouldPrint = false
  ) {

    try {

      setLoading(true);

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      let clientId = null;

      const {
        data: existingClient,
      } = await supabase
        .from("clients")
        .select("*")
        .eq(
          "email",
          clientEmail
        )
        .maybeSingle();

      if (existingClient) {

        clientId =
          existingClient.id;

      } else {

        const {
          data: newClient,
        } = await supabase
          .from("clients")
          .insert({
            business_id:
              business.id,
            client_name:
              clientName,
            email:
              clientEmail,
            phone:
              clientPhone,
            billing_address:
              billingAddress,
            shipping_address:
              shippingAddress,
          })
          .select()
          .single();

        clientId =
          newClient?.id;
      }

      const {
        data: invoice,
        error,
      } = await supabase
        .from("invoices")
        .insert({
          business_id:
            business.id,
          client_id:
            clientId,
          invoice_number:
            invoiceNumber,
          po_number:
            poNumber,
          issue_date:
            issueDate,
          due_date:
            dueDate,
          subtotal:
            totals.subtotal,
          total_tax:
            totals.totalTax,
          total_discount:
            totals.totalDiscount,
          grand_total:
            totals.grandTotal,
          payment_terms:
            paymentTerms,
          notes,
          currency: "INR",
        })
        .select()
        .single();

      if (error) {

        console.error(error);

        alert(error.message);

        return;
      }

      const invoiceItems =
        items.map((item) => ({
          invoice_id:
            invoice.id,
          item_name:
            item.item_name,
          description:
            item.description,
          batch_number:
            item.batch_number,
          expiry_date:
            item.expiry_date,
          quantity:
            item.quantity,
          unit_price:
            item.unit_price,
          tax_rate:
            item.tax_rate,
          discount_rate:
            item.discount_rate,
          total_amount:
            calculateLineTotal(
              item
            ),
        }));

      await supabase
        .from("invoice_items")
        .insert(invoiceItems);

      if (shouldPrint) {

        router.push(
          `/dashboard/invoices/${invoice.id}`
        );

        return;
      }

      router.push(
        "/dashboard/invoices"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  }

  function resetForm() {

    window.location.reload();
  }

  return (

    <div className="space-y-8 pb-32">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-3xl font-black text-[#0f172a]">

            Create Invoice

          </h1>

          <p className="mt-2 text-gray-500">

            Generate professional invoices.

          </p>

        </div>

        <Link
          href="/dashboard/invoices"
          className="flex h-12 items-center gap-2 rounded-2xl border border-black/10 bg-white px-5 font-semibold"
        >

          <ArrowLeft size={18} />

          Back

        </Link>

      </div>

      <div className="rounded-[32px] border border-black/5 bg-white p-8 shadow-sm">

        <div className="grid gap-5 md:grid-cols-2">

          <input
            value={invoiceNumber}
            readOnly
            className="h-14 rounded-2xl border border-black/10 bg-gray-100 px-4"
          />

          <input
            placeholder="PO Number"
            value={poNumber}
            onChange={(e) =>
              setPoNumber(
                e.target.value
              )
            }
            className="h-14 rounded-2xl border border-black/10 px-4"
          />

          <input
            type="date"
            value={issueDate}
            onChange={(e) =>
              setIssueDate(
                e.target.value
              )
            }
            className="h-14 rounded-2xl border border-black/10 px-4"
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(
                e.target.value
              )
            }
            className="h-14 rounded-2xl border border-black/10 px-4"
          />

        </div>

      </div>

      <div className="rounded-[32px] border border-black/5 bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-black">

          Client Details

        </h2>

        <div className="grid gap-5 md:grid-cols-2">

          <input
            placeholder="Client Name"
            value={clientName}
            onChange={(e) =>
              setClientName(
                e.target.value
              )
            }
            className="h-14 rounded-2xl border border-black/10 px-4"
          />

          <input
            placeholder="Client Email"
            value={clientEmail}
            onChange={(e) =>
              setClientEmail(
                e.target.value
              )
            }
            className="h-14 rounded-2xl border border-black/10 px-4"
          />

          <input
            placeholder="Client Phone"
            value={clientPhone}
            onChange={(e) =>
              setClientPhone(
                e.target.value
              )
            }
            className="h-14 rounded-2xl border border-black/10 px-4"
          />

          <input
            placeholder="Billing Address"
            value={billingAddress}
            onChange={(e) =>
              setBillingAddress(
                e.target.value
              )
            }
            className="h-14 rounded-2xl border border-black/10 px-4"
          />

        </div>

      </div>

      <div className="rounded-[32px] border border-black/5 bg-white p-8 shadow-sm">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-black">

            Invoice Items

          </h2>

          <button
            onClick={addItem}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 px-5 py-3 font-semibold text-white"
          >

            <Plus size={18} />

            Add Item

          </button>

        </div>

        <div className="space-y-6">

          {items.map(
            (item, index) => {

              const total =
                calculateLineTotal(
                  item
                );

              return (

                <div
                  key={index}
                  className="rounded-3xl border border-black/5 bg-[#f8fafc] p-5"
                >

                  <div className="grid gap-4 lg:grid-cols-4">

                    <input
                      placeholder="Item Name"
                      value={
                        item.item_name
                      }
                      onChange={(e) =>
                        updateItem(
                          index,
                          "item_name",
                          e.target
                            .value
                        )
                      }
                      className="h-12 rounded-xl border border-black/10 px-4"
                    />

                    <input
                      placeholder="Batch Number"
                      value={
                        item.batch_number
                      }
                      onChange={(e) =>
                        updateItem(
                          index,
                          "batch_number",
                          e.target
                            .value
                        )
                      }
                      className="h-12 rounded-xl border border-black/10 px-4"
                    />

                    <input
                      placeholder="Expiry Date"
                      value={
                        item.expiry_date
                      }
                      onChange={(e) =>
                        updateItem(
                          index,
                          "expiry_date",
                          e.target
                            .value
                        )
                      }
                      className="h-12 rounded-xl border border-black/10 px-4"
                    />

                    <input
                      placeholder="Description"
                      value={
                        item.description
                      }
                      onChange={(e) =>
                        updateItem(
                          index,
                          "description",
                          e.target
                            .value
                        )
                      }
                      className="h-12 rounded-xl border border-black/10 px-4"
                    />

                    <input
                      type="number"
                      placeholder="Qty"
                      value={
                        item.quantity
                      }
                      onChange={(e) =>
                        updateItem(
                          index,
                          "quantity",
                          Number(
                            e.target
                              .value
                          )
                        )
                      }
                      className="h-12 rounded-xl border border-black/10 px-4"
                    />

                    <input
                      type="number"
                      placeholder="Rate"
                      value={
                        item.unit_price
                      }
                      onChange={(e) =>
                        updateItem(
                          index,
                          "unit_price",
                          Number(
                            e.target
                              .value
                          )
                        )
                      }
                      className="h-12 rounded-xl border border-black/10 px-4"
                    />

                    <input
                      type="number"
                      placeholder="Tax %"
                      value={
                        item.tax_rate
                      }
                      onChange={(e) =>
                        updateItem(
                          index,
                          "tax_rate",
                          Number(
                            e.target
                              .value
                          )
                        )
                      }
                      className="h-12 rounded-xl border border-black/10 px-4"
                    />

                    <input
                      type="number"
                      placeholder="Discount %"
                      value={
                        item.discount_rate
                      }
                      onChange={(e) =>
                        updateItem(
                          index,
                          "discount_rate",
                          Number(
                            e.target
                              .value
                          )
                        )
                      }
                      className="h-12 rounded-xl border border-black/10 px-4"
                    />

                  </div>

                  <div className="mt-5 flex items-center justify-between">

                    <div className="text-lg font-black text-blue-600">

                      ₹ {total.toFixed(2)}

                    </div>

                    {items.length >
                      1 && (

                      <button
                        onClick={() =>
                          removeItem(
                            index
                          )
                        }
                        className="flex items-center gap-2 text-red-500"
                      >

                        <Trash2
                          size={16}
                        />

                        Remove

                      </button>

                    )}

                  </div>

                </div>
              );
            }
          )}

        </div>

      </div>

      <div className="rounded-[32px] border border-black/5 bg-white p-8 shadow-sm">

        <textarea
          placeholder="Payment Terms"
          value={paymentTerms}
          onChange={(e) =>
            setPaymentTerms(
              e.target.value
            )
          }
          className="min-h-[120px] w-full rounded-2xl border border-black/10 p-5 outline-none"
        />

      </div>

      <div className="rounded-[32px] border border-black/5 bg-white p-8 shadow-sm">

        <div className="space-y-4">

          <div className="flex items-center justify-between">

            <span className="text-gray-500">

              Subtotal

            </span>

            <span className="font-bold">

              ₹ {totals.subtotal.toFixed(2)}

            </span>

          </div>

          <div className="flex items-center justify-between">

            <span className="text-gray-500">

              Tax

            </span>

            <span className="font-bold">

              ₹ {totals.totalTax.toFixed(2)}

            </span>

          </div>

          <div className="flex items-center justify-between">

            <span className="text-gray-500">

              Discount

            </span>

            <span className="font-bold">

              ₹ {totals.totalDiscount.toFixed(2)}

            </span>

          </div>

          <div className="border-t pt-4">

            <div className="flex items-center justify-between">

              <span className="text-2xl font-black">

                Grand Total

              </span>

              <span className="text-3xl font-black text-blue-600">

                ₹ {totals.grandTotal.toFixed(2)}

              </span>

            </div>

          </div>

        </div>

      </div>

      <div className="sticky bottom-5 z-50 flex flex-wrap gap-4 rounded-[28px] border border-black/5 bg-white p-5 shadow-2xl">

        <button
          onClick={() =>
            handleSave(false)
          }
          disabled={loading}
          className="flex h-14 items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 px-8 font-semibold text-white"
        >

          <Save size={18} />

          {loading
            ? "Saving..."
            : "Save"}

        </button>

        <button
          onClick={() =>
            handleSave(true)
          }
          className="flex h-14 items-center gap-3 rounded-2xl border border-black/10 bg-white px-8 font-semibold"
        >

          <Printer size={18} />

          Save & Print

        </button>

        <button
          onClick={resetForm}
          className="flex h-14 items-center gap-3 rounded-2xl border border-black/10 bg-white px-8 font-semibold"
        >

          <RotateCcw size={18} />

          Reset

        </button>

      </div>

    </div>
  );
}
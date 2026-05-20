"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Building2,
  CalendarDays,
  FileText,
  Plus,
  Printer,
  RotateCcw,
  Save,
  Trash2,
  User2,
  X,
} from "lucide-react";

import { createClient } from "@/utils/supabase/client";

type InvoiceItem = {
  item_name: string;
  description?: string;
  batch_number: string;
  expiry_date: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
  discount_rate: number;
  line_total: number;
};

type Business = {
  id: string;
  business_name: string;
  business_email: string;
  phone_number: string;
  gstin: string;
  address: string;
};

type Product = {
  id: string;

  product_name: string;

  description: string;

  batch_number: string;

  expiry_date: string;

  selling_price: number;

  tax_rate: number;
};

const defaultItem: InvoiceItem = {
  item_name: "",
  description: "",
  batch_number: "",
  expiry_date: "",
  quantity: 1,
  unit_price: 0,
  tax_rate: 0,
  discount_rate: 0,
  line_total: 0,
};

export default function CreateInvoicePage() {
  const router = useRouter();

  const supabase = createClient();

  const [loading, setLoading] = useState(false);

  const [business, setBusiness] =
    useState<Business | null>(null);

  const [invoiceNumber, setInvoiceNumber] =
    useState("");

  const [issueDate, setIssueDate] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");

  const [poNumber, setPoNumber] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [clientName, setClientName] =
    useState("");

  const [clientEmail, setClientEmail] =
    useState("");

  const [clientPhone, setClientPhone] =
    useState("");

  const [billingAddress, setBillingAddress] =
    useState("");

  const [items, setItems] = useState<
    InvoiceItem[]
  >([defaultItem]);
const [products, setProducts] =
  useState<Product[]>([]);

const [activeSearchIndex, setActiveSearchIndex] =
  useState<number | null>(null);
  /* MOBILE ITEM MODAL */

  const [showItemModal, setShowItemModal] =
    useState(false);

  const [mobileItem, setMobileItem] =
    useState<InvoiceItem>(defaultItem);

  useEffect(() => {
    loadBusiness();
    
    generateInvoiceNumber();

    setIssueDate(
      new Date().toISOString().split("T")[0]
    );
  }, []);

  async function loadProducts(
  businessId: string
) {

  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("business_id", businessId);

  setProducts(data || []);

}
  async function loadBusiness() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

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
    loadProducts(data.id);
  }
  
  function generateInvoiceNumber() {
    const random = Math.floor(
      1000 + Math.random() * 9000
    );

    setInvoiceNumber(`INV-${random}`);
  }

  function calculateLineTotal(
    item: InvoiceItem
  ) {
    const subtotal =
      item.quantity * item.unit_price;

    const tax =
      (subtotal * item.tax_rate) / 100;

    const discount =
      (subtotal * item.discount_rate) /
      100;

    return subtotal + tax - discount;
  }

  function updateItem(
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) {
    const updated = [...items];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    updated[index].line_total =
      calculateLineTotal(updated[index]);

    setItems(updated);
  }
  function selectProduct(
  index: number,
  product: Product
) {

  const updated = [...items];

  updated[index] = {
    ...updated[index],

    item_name:
      product.product_name,

    description:
      product.description || "",

    batch_number:
      product.batch_number || "",

    expiry_date:
      product.expiry_date || "",

    unit_price:
      Number(
        product.selling_price
      ) || 0,

    tax_rate:
      Number(
        product.tax_rate
      ) || 0,
  };

  updated[index].line_total =
    calculateLineTotal(
      updated[index]
    );

  setItems(updated);

  setActiveSearchIndex(null);

}
  function addItem() {
    setItems([...items, defaultItem]);
  }

  function saveMobileItem() {
    const updatedItem = {
      ...mobileItem,
      line_total:
        calculateLineTotal(mobileItem),
    };

    setItems([...items, updatedItem]);

    setMobileItem(defaultItem);

    setShowItemModal(false);
  }

  function removeItem(index: number) {
    setItems(
      items.filter((_, i) => i !== index)
    );
  }

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => {
      return (
        acc +
        item.quantity * item.unit_price
      );
    }, 0);
  }, [items]);

  const totalTax = useMemo(() => {
    return items.reduce((acc, item) => {
      return (
        acc +
        (item.quantity *
          item.unit_price *
          item.tax_rate) /
          100
      );
    }, 0);
  }, [items]);

  const totalDiscount = useMemo(() => {
    return items.reduce((acc, item) => {
      return (
        acc +
        (item.quantity *
          item.unit_price *
          item.discount_rate) /
          100
      );
    }, 0);
  }, [items]);

  const grandTotal =
    subtotal + totalTax - totalDiscount;

  async function handleSave() {
    try {
      if (!business) {
        alert("Business not found");
        return;
      }

      setLoading(true);

      const { data: invoice, error } =
        await supabase
          .from("invoices")
          .insert({
  business_id: business.id,

  invoice_number: invoiceNumber,

  issue_date: issueDate,

  due_date: dueDate || null,

  po_number: poNumber || null,

  client_name: clientName,

  client_email: clientEmail,

  client_phone: clientPhone,

  billing_address: billingAddress,

  subtotal,

  total_tax: totalTax,

  total_discount: totalDiscount,

  grand_total: grandTotal,

  currency: "INR",

  notes,

  status: "pending",
})
          .select()
          .single();

      if (error || !invoice) {
        alert(error?.message);
        return;
      }

      const formattedItems = items.map(
        (item) => ({
          invoice_id: invoice.id,
          item_name: item.item_name,
          description: item.description,
          batch_number: item.batch_number,
          expiry_date: item.expiry_date,
          quantity: item.quantity,
          unit_price: item.unit_price,
          tax_rate: item.tax_rate,
          discount_rate: item.discount_rate,
          line_total: item.line_total,
        })
      );

      const { error: itemError } =
        await supabase
          .from("invoice_items")
          .insert(formattedItems);

      if (itemError) {
        alert(itemError.message);
        return;
      }
      /* AUTO INVENTORY */

for (const item of items) {

  const { data: existingProduct } =
    await supabase
      .from("products")
      .select("*")
      .eq("business_id", business.id)
      .eq("product_name", item.item_name)
      .single();

  if (existingProduct) {

    await supabase
      .from("products")
      .update({
        batch_number:
          item.batch_number,

        expiry_date:
          item.expiry_date,

        selling_price:
          item.unit_price,

        tax_rate:
          item.tax_rate,

        updated_at:
          new Date().toISOString(),
      })
      .eq("id", existingProduct.id);

  } else {

    await supabase
      .from("products")
      .insert({
        business_id: business.id,

        product_name:
          item.item_name,

        description:
          item.description,

        batch_number:
          item.batch_number,

        expiry_date:
          item.expiry_date,

        selling_price:
          item.unit_price,

        tax_rate:
          item.tax_rate,

        stock_quantity: 0,
      });

  }

}
      alert(
        "Invoice Created Successfully"
      );

      router.push("/dashboard/invoices");
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handlePrint() {
    window.print();
  }

  function resetInvoice() {
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    setBillingAddress("");
    setPoNumber("");
    setNotes("");

    setItems([defaultItem]);
  }

  return (
    <div className="min-h-screen bg-[#eef3ff]">

      {/* TOPBAR */}

      <div className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur-xl">

        <div className="flex flex-col gap-4 px-4 py-5 2xl:flex-row 2xl:items-center 2xl:justify-between">

          <div>

            <h1 className="text-3xl font-black text-[#0f172a]">
              Create Invoice
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Enterprise billing workspace
            </p>

          </div>

          <div className="hidden flex-wrap items-center gap-3 xl:flex">

            <button
              onClick={() =>
                router.back()
              }
              className="flex h-11 items-center gap-2 rounded-xl border border-black/10 bg-white px-5 font-semibold"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <button
              onClick={handlePrint}
              className="flex h-11 items-center gap-2 rounded-xl border border-black/10 bg-white px-5 font-semibold"
            >
              <Printer size={16} />
              Print
            </button>

            <button
              onClick={resetInvoice}
              className="flex h-11 items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-5 font-semibold text-red-500"
            >
              <RotateCcw size={16} />
              Reset
            </button>

            <button
              onClick={handleSave}
              disabled={loading}
              className="flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 px-6 font-semibold text-white shadow-lg"
            >
              <Save size={16} />

              {loading
                ? "Saving..."
                : "Save Invoice"}
            </button>

          </div>

        </div>

      </div>

      {/* MAIN */}

      <div className="w-full px-4 py-5">

        <div className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1fr)_380px]">

          {/* LEFT */}

          <div className="min-w-0 space-y-5">

            {/* TOP GRID */}

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

              {/* BUSINESS */}

              <div className="rounded-[28px] bg-white p-6 shadow-sm">

                <div className="mb-6 flex items-center gap-4">

                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 text-white">

                    <Building2 size={30} />

                  </div>

                  <div className="min-w-0">

                    <h2 className="truncate text-2xl font-black text-[#0f172a]">
                      {
                        business?.business_name
                      }
                    </h2>

                    <p className="text-gray-500">
                      Enterprise Workspace
                    </p>

                  </div>

                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                  <input
                    disabled
                    value={
                      business?.business_email ||
                      ""
                    }
                    className="h-12 rounded-xl border border-black/10 bg-[#f8faff] px-4"
                  />

                  <input
                    disabled
                    value={
                      business?.phone_number ||
                      ""
                    }
                    className="h-12 rounded-xl border border-black/10 bg-[#f8faff] px-4"
                  />

                  <input
                    disabled
                    value={
                      business?.gstin || ""
                    }
                    className="h-12 rounded-xl border border-black/10 bg-[#f8faff] px-4"
                  />

                  <input
                    disabled
                    value={
                      business?.address || ""
                    }
                    className="h-12 rounded-xl border border-black/10 bg-[#f8faff] px-4"
                  />

                </div>

              </div>

              {/* INVOICE DETAILS */}

              <div className="rounded-[28px] bg-white p-6 shadow-sm">

                <div className="mb-6 flex items-center gap-3">

                  <CalendarDays
                    size={24}
                    className="text-blue-600"
                  />

                  <h2 className="text-2xl font-black text-[#0f172a]">
                    Invoice Details
                  </h2>

                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                  <input
                    disabled
                    value={invoiceNumber}
                    className="h-12 rounded-xl border border-black/10 bg-[#f8faff] px-4 font-bold"
                  />

                  <input
                    value={poNumber}
                    onChange={(e) =>
                      setPoNumber(
                        e.target.value
                      )
                    }
                    placeholder="PO Number"
                    className="h-12 rounded-xl border border-black/10 px-4"
                  />

                  <input
                    type="date"
                    value={issueDate}
                    onChange={(e) =>
                      setIssueDate(
                        e.target.value
                      )
                    }
                    className="h-12 rounded-xl border border-black/10 px-4"
                  />

                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) =>
                      setDueDate(
                        e.target.value
                      )
                    }
                    className="h-12 rounded-xl border border-black/10 px-4"
                  />

                </div>

              </div>

            </div>

            {/* CLIENT */}

            <div className="rounded-[28px] bg-white p-6 shadow-sm">

              <div className="mb-6 flex items-center gap-3">

                <User2
                  size={24}
                  className="text-blue-600"
                />

                <h2 className="text-2xl font-black text-[#0f172a]">
                  Client Details
                </h2>

              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

                <input
                  placeholder="Client Name"
                  value={clientName}
                  onChange={(e) =>
                    setClientName(
                      e.target.value
                    )
                  }
                  className="h-12 rounded-xl border border-black/10 px-4"
                />

                <input
                  placeholder="Client Email"
                  value={clientEmail}
                  onChange={(e) =>
                    setClientEmail(
                      e.target.value
                    )
                  }
                  className="h-12 rounded-xl border border-black/10 px-4"
                />

                <input
                  placeholder="Client Phone"
                  value={clientPhone}
                  onChange={(e) =>
                    setClientPhone(
                      e.target.value
                    )
                  }
                  className="h-12 rounded-xl border border-black/10 px-4"
                />

                <input
                  placeholder="Billing Address"
                  value={billingAddress}
                  onChange={(e) =>
                    setBillingAddress(
                      e.target.value
                    )
                  }
                  className="h-12 rounded-xl border border-black/10 px-4"
                />

              </div>

            </div>

            {/* ITEMS */}

            <div className="rounded-[28px] bg-white p-6 shadow-sm">

              <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <h2 className="text-3xl font-black text-[#0f172a]">
                    Invoice Items
                  </h2>

                  <p className="mt-1 text-gray-500">
                    Add products,
                    medicines &
                    services
                  </p>

                </div>

                <button
                  onClick={() => {
                    if (
                      window.innerWidth <
                      1280
                    ) {
                      setShowItemModal(
                        true
                      );
                    } else {
                      addItem();
                    }
                  }}
                  className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 px-6 font-semibold text-white shadow-lg"
                >
                  <Plus size={18} />
                  Add Item
                </button>

              </div>

              {/* DESKTOP TABLE */}

              <div className="hidden xl:block">

                <div className="grid grid-cols-8 gap-3 rounded-2xl bg-[#f8faff] px-4 py-4">

                  {[
                    "Item",
                    "Batch",
                    "Expiry",
                    "Qty",
                    "Rate",
                    "Tax %",
                    "Disc %",
                    "Total",
                  ].map((title) => (
                    <p
                      key={title}
                      className="truncate text-xs font-black uppercase text-gray-500"
                    >
                      {title}
                    </p>
                  ))}

                </div>

                <div className="mt-4 space-y-4">

                  {items.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="grid grid-cols-8 gap-3 rounded-3xl border border-black/5 bg-[#fbfcff] p-4"
                      >

                        <div className="relative">

  <input
    value={item.item_name}
    onFocus={() =>
      setActiveSearchIndex(index)
    }
    onChange={(e) =>
      updateItem(
        index,
        "item_name",
        e.target.value
      )
    }
    placeholder="Search medicine..."
    className="h-12 w-full rounded-xl border border-black/10 bg-white px-3"
  />

  {activeSearchIndex === index &&
    item.item_name && (

      <div className="absolute left-0 top-14 z-50 max-h-[260px] w-full overflow-y-auto rounded-2xl border border-black/5 bg-white shadow-2xl">

        {products
          .filter((product) =>
            product.product_name
              ?.toLowerCase()
              .includes(
                item.item_name.toLowerCase()
              )
          )
          .slice(0, 8)
          .map((product) => (

            <button
              key={product.id}
              type="button"
              onClick={() =>
                selectProduct(
                  index,
                  product
                )
              }
              className="flex w-full flex-col border-b border-black/5 px-4 py-3 text-left hover:bg-[#f8faff]"
            >

              <span className="font-bold text-[#0f172a]">

                {
                  product.product_name
                }

              </span>

              <span className="mt-1 text-xs text-gray-500">

                Batch:
                {" "}
                {
                  product.batch_number
                }

                {" • "}

                ₹
                {
                  product.selling_price
                }

              </span>

            </button>

          ))}

      </div>

    )}

</div>

                        <input
                          value={
                            item.batch_number
                          }
                          onChange={(
                            e
                          ) =>
                            updateItem(
                              index,
                              "batch_number",
                              e.target
                                .value
                            )
                          }
                          placeholder="Batch"
                          className="h-12 rounded-xl border border-black/10 bg-white px-3"
                        />

                        <input
                          type="date"
                          value={
                            item.expiry_date
                          }
                          onChange={(
                            e
                          ) =>
                            updateItem(
                              index,
                              "expiry_date",
                              e.target
                                .value
                            )
                          }
                          className="h-12 rounded-xl border border-black/10 bg-white px-3"
                        />

                        <input
                          type="number"
                          value={
                            item.quantity
                          }
                          onChange={(
                            e
                          ) =>
                            updateItem(
                              index,
                              "quantity",
                              Number(
                                e
                                  .target
                                  .value
                              )
                            )
                          }
                          className="h-12 rounded-xl border border-black/10 bg-white px-3"
                        />

                        <input
                          type="number"
                          value={
                            item.unit_price
                          }
                          onChange={(
                            e
                          ) =>
                            updateItem(
                              index,
                              "unit_price",
                              Number(
                                e
                                  .target
                                  .value
                              )
                            )
                          }
                          className="h-12 rounded-xl border border-black/10 bg-white px-3"
                        />

                        <input
                          type="number"
                          value={
                            item.tax_rate
                          }
                          onChange={(
                            e
                          ) =>
                            updateItem(
                              index,
                              "tax_rate",
                              Number(
                                e
                                  .target
                                  .value
                              )
                            )
                          }
                          className="h-12 rounded-xl border border-black/10 bg-white px-3"
                        />

                        <input
                          type="number"
                          value={
                            item.discount_rate
                          }
                          onChange={(
                            e
                          ) =>
                            updateItem(
                              index,
                              "discount_rate",
                              Number(
                                e
                                  .target
                                  .value
                              )
                            )
                          }
                          className="h-12 rounded-xl border border-black/10 bg-white px-3"
                        />

                        <div className="flex h-12 items-center justify-between rounded-xl border border-black/10 bg-white px-3">

                          <span className="truncate font-black">
                            ₹
                            {item.line_total.toFixed(
                              2
                            )}
                          </span>

                          <button
                            onClick={() =>
                              removeItem(
                                index
                              )
                            }
                            className="ml-2 shrink-0 text-red-500"
                          >
                            <Trash2
                              size={18}
                            />
                          </button>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

              {/* MOBILE CARDS */}

              <div className="space-y-4 xl:hidden">

                {items.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="rounded-3xl border border-black/5 bg-[#f8faff] p-5"
                    >

                      <div className="mb-4 flex items-center justify-between">

                        <h3 className="font-black text-[#0f172a]">
                          {
                            item.item_name
                          }
                        </h3>

                        <button
                          onClick={() =>
                            removeItem(
                              index
                            )
                          }
                          className="text-red-500"
                        >
                          <Trash2
                            size={18}
                          />
                        </button>

                      </div>

                      <div className="grid grid-cols-2 gap-4">

                        <div>
                          <p className="text-xs text-gray-500">
                            Qty
                          </p>

                          <p className="font-bold">
                            {
                              item.quantity
                            }
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">
                            Rate
                          </p>

                          <p className="font-bold">
                            ₹
                            {
                              item.unit_price
                            }
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">
                            Tax
                          </p>

                          <p className="font-bold">
                            {
                              item.tax_rate
                            }
                            %
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">
                            Total
                          </p>

                          <p className="font-black text-blue-600">
                            ₹
                            {item.line_total.toFixed(
                              2
                            )}
                          </p>
                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

          {/* SIDEBAR */}

          <div className="space-y-5">

            <div className="rounded-[28px] bg-white p-6 shadow-sm 2xl:sticky 2xl:top-24">

              <div className="mb-6 flex items-center gap-3">

                <FileText
                  size={24}
                  className="text-blue-600"
                />

                <h2 className="text-2xl font-black text-[#0f172a]">
                  Invoice Summary
                </h2>

              </div>

              <div className="space-y-5">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-black">
                    ₹
                    {subtotal.toFixed(2)}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Tax
                  </span>

                  <span className="font-black">
                    ₹
                    {totalTax.toFixed(2)}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Discount
                  </span>

                  <span className="font-black">
                    ₹
                    {totalDiscount.toFixed(
                      2
                    )}
                  </span>

                </div>

                <div className="border-t border-dashed border-black/10 pt-5">

                  <div className="flex items-center justify-between">

                    <span className="text-2xl font-black">
                      Grand Total
                    </span>

                    <span className="text-4xl font-black text-blue-600">
                      ₹
                      {grandTotal.toFixed(
                        2
                      )}
                    </span>

                  </div>

                  {/* BUTTONS */}

                  <div className="mt-8 space-y-3">

                    <button
                      onClick={
                        handleSave
                      }
                      disabled={
                        loading
                      }
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 font-semibold text-white shadow-lg"
                    >
                      <Save
                        size={18}
                      />

                      {loading
                        ? "Saving..."
                        : "Save Invoice"}
                    </button>

                    <button
                      onClick={() => {
                        handleSave();

                        setTimeout(
                          () => {
                            window.print();
                          },
                          1000
                        );
                      }}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 font-semibold text-blue-600"
                    >
                      <Printer
                        size={18}
                      />
                      Save & Print
                    </button>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                      <button
                        onClick={
                          resetInvoice
                        }
                        className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 font-semibold text-red-500"
                      >
                        <RotateCcw
                          size={16}
                        />
                        Reset
                      </button>

                      <button
                        onClick={
                          handlePrint
                        }
                        className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white font-semibold"
                      >
                        <Printer
                          size={16}
                        />
                        Print
                      </button>

                      <button
                        onClick={() =>
                          router.back()
                        }
                        className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white font-semibold"
                      >
                        <ArrowLeft
                          size={16}
                        />
                        Back
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* MOBILE MODAL */}

      {/* MOBILE / TABLET ITEM MODAL */}

{showItemModal && (
  <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm xl:hidden">

    <div className="max-h-[95vh] w-full overflow-y-auto rounded-t-[34px] bg-white p-5 shadow-2xl">

      {/* HEADER */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-black text-[#0f172a]">
            Add Invoice Item
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add medicine, product or service
          </p>

        </div>

        <button
          onClick={() => setShowItemModal(false)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-500"
        >
          <X size={20} />
        </button>

      </div>

      {/* FORM */}

      <div className="space-y-5">

        {/* ITEM NAME */}

        <div>

          <label className="mb-2 block text-sm font-bold text-[#0f172a]">
            Item / Medicine Name
          </label>

          <input
            placeholder="Example: PCM 650"
            value={mobileItem.item_name}
            onChange={(e) =>
              setMobileItem({
                ...mobileItem,
                item_name: e.target.value,
              })
            }
            className="h-14 w-full rounded-2xl border border-black/10 px-4 text-[15px] outline-none transition focus:border-blue-500"
          />

        </div>

        {/* DESCRIPTION */}

        <div>

          <label className="mb-2 block text-sm font-bold text-[#0f172a]">
            Description
          </label>

          <textarea
            placeholder="Short product description..."
            value={mobileItem.description}
            onChange={(e) =>
              setMobileItem({
                ...mobileItem,
                description: e.target.value,
              })
            }
            className="min-h-[120px] w-full rounded-2xl border border-black/10 p-4 text-[15px] outline-none transition focus:border-blue-500"
          />

        </div>

        {/* BATCH */}

        <div>

          <label className="mb-2 block text-sm font-bold text-[#0f172a]">
            Batch Number
          </label>

          <input
            placeholder="Example: BT2026A"
            value={mobileItem.batch_number}
            onChange={(e) =>
              setMobileItem({
                ...mobileItem,
                batch_number: e.target.value,
              })
            }
            className="h-14 w-full rounded-2xl border border-black/10 px-4 text-[15px] outline-none transition focus:border-blue-500"
          />

        </div>

        {/* EXPIRY */}

        <div>

          <label className="mb-2 block text-sm font-bold text-[#0f172a]">
            Expiry Date
          </label>

          <input
            type="date"
            value={mobileItem.expiry_date}
            onChange={(e) =>
              setMobileItem({
                ...mobileItem,
                expiry_date: e.target.value,
              })
            }
            className="h-14 w-full rounded-2xl border border-black/10 px-4 text-[15px] outline-none transition focus:border-blue-500"
          />

        </div>

        {/* QTY + PRICE */}

        <div className="grid grid-cols-2 gap-4">

          <div>

            <label className="mb-2 block text-sm font-bold text-[#0f172a]">
              Quantity
            </label>

            <input
              type="number"
              placeholder="0"
              value={mobileItem.quantity}
              onChange={(e) =>
                setMobileItem({
                  ...mobileItem,
                  quantity: Number(e.target.value),
                })
              }
              className="h-14 w-full rounded-2xl border border-black/10 px-4 outline-none transition focus:border-blue-500"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-bold text-[#0f172a]">
              Unit Price
            </label>

            <input
              type="number"
              placeholder="₹ 0.00"
              value={mobileItem.unit_price}
              onChange={(e) =>
                setMobileItem({
                  ...mobileItem,
                  unit_price: Number(e.target.value),
                })
              }
              className="h-14 w-full rounded-2xl border border-black/10 px-4 outline-none transition focus:border-blue-500"
            />

          </div>

        </div>

        {/* TAX + DISCOUNT */}

        <div className="grid grid-cols-2 gap-4">

          <div>

            <label className="mb-2 block text-sm font-bold text-[#0f172a]">
              GST / Tax %
            </label>

            <input
              type="number"
              placeholder="GST %"
              value={mobileItem.tax_rate}
              onChange={(e) =>
                setMobileItem({
                  ...mobileItem,
                  tax_rate: Number(e.target.value),
                })
              }
              className="h-14 w-full rounded-2xl border border-black/10 px-4 outline-none transition focus:border-blue-500"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-bold text-[#0f172a]">
              Discount %
            </label>

            <input
              type="number"
              placeholder="0"
              value={mobileItem.discount_rate}
              onChange={(e) =>
                setMobileItem({
                  ...mobileItem,
                  discount_rate: Number(e.target.value),
                })
              }
              className="h-14 w-full rounded-2xl border border-black/10 px-4 outline-none transition focus:border-blue-500"
            />

          </div>

        </div>

        {/* TOTAL */}

        <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 via-violet-50 to-cyan-50 p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Calculated Line Total
              </p>

              <h3 className="mt-1 text-3xl font-black text-[#0f172a]">
                ₹
                {calculateLineTotal(
                  mobileItem
                ).toFixed(2)}
              </h3>

            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">

              <FileText
                size={24}
                className="text-blue-600"
              />

            </div>

          </div>

        </div>

        {/* SAVE BUTTON */}

        <button
          onClick={saveMobileItem}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 text-lg font-bold text-white shadow-xl transition active:scale-[0.98]"
        >

          <Save size={20} />

          Save Item

        </button>

      </div>

    </div>

  </div>
)}

    </div>
  );
}
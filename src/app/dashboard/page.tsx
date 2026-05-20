import {
  BarChart3,
  CreditCard,
  DollarSign,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">

      {/* Hero Section */}
      <section
        className="
          relative
          overflow-hidden
          rounded-[36px]
          border
          border-black/5
          bg-white
          p-6
          shadow-sm
          sm:p-8
          lg:p-10
        "
      >

        {/* Background Glow */}
        <div
          className="
            absolute
            left-0
            top-0
            h-72
            w-72
            rounded-full
            bg-blue-500/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-0
            h-72
            w-72
            rounded-full
            bg-violet-500/10
            blur-3xl
          "
        />

        <div className="relative z-10">

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-black/10
              bg-[#f8fafc]
              px-4
              py-2
              text-sm
              font-medium
              text-gray-600
            "
          >
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Enterprise Workspace Active
          </div>

          <h1
            className="
              mt-6
              text-3xl
              font-black
              tracking-tight
              text-[#0f172a]
              sm:text-4xl
              lg:text-5xl
            "
          >
            Welcome to NXTInvoice®
          </h1>

          <p
            className="
              mt-4
              max-w-2xl
              text-[15px]
              leading-7
              text-gray-500
              sm:text-base
            "
          >
            Your enterprise invoicing workspace is now successfully
            configured. Manage invoices, clients, analytics,
            reports, and business operations from a unified dashboard.
          </p>

        </div>
      </section>

      {/* Stats Grid */}
      <section
        className="
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >

        {/* Revenue */}
        <div
          className="
            rounded-[28px]
            border
            border-black/5
            bg-white
            p-6
            shadow-sm
          "
        >
          <div className="flex items-center justify-between">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-blue-500/10
              "
            >
              <DollarSign className="text-blue-600" size={26} />
            </div>

            <span
              className="
                rounded-full
                bg-green-100
                px-3
                py-1
                text-xs
                font-semibold
                text-green-700
              "
            >
              +0%
            </span>

          </div>

          <h3
            className="
              mt-6
              text-sm
              font-medium
              text-gray-500
            "
          >
            Total Revenue
          </h3>

          <p
            className="
              mt-2
              text-3xl
              font-black
              text-[#0f172a]
            "
          >
            ₹0
          </p>
        </div>

        {/* Invoices */}
        <div
          className="
            rounded-[28px]
            border
            border-black/5
            bg-white
            p-6
            shadow-sm
          "
        >
          <div className="flex items-center justify-between">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-violet-500/10
              "
            >
              <FileText
                className="text-violet-600"
                size={24}
              />
            </div>

            <span
              className="
                rounded-full
                bg-[#f8fafc]
                px-3
                py-1
                text-xs
                font-semibold
                text-gray-500
              "
            >
              Active
            </span>

          </div>

          <h3
            className="
              mt-6
              text-sm
              font-medium
              text-gray-500
            "
          >
            Total Invoices
          </h3>

          <p
            className="
              mt-2
              text-3xl
              font-black
              text-[#0f172a]
            "
          >
            0
          </p>
        </div>

        {/* Clients */}
        <div
          className="
            rounded-[28px]
            border
            border-black/5
            bg-white
            p-6
            shadow-sm
          "
        >
          <div className="flex items-center justify-between">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-cyan-500/10
              "
            >
              <Users className="text-cyan-600" size={24} />
            </div>

            <span
              className="
                rounded-full
                bg-[#f8fafc]
                px-3
                py-1
                text-xs
                font-semibold
                text-gray-500
              "
            >
              Connected
            </span>

          </div>

          <h3
            className="
              mt-6
              text-sm
              font-medium
              text-gray-500
            "
          >
            Total Clients
          </h3>

          <p
            className="
              mt-2
              text-3xl
              font-black
              text-[#0f172a]
            "
          >
            0
          </p>
        </div>

        {/* Payments */}
        <div
          className="
            rounded-[28px]
            border
            border-black/5
            bg-white
            p-6
            shadow-sm
          "
        >
          <div className="flex items-center justify-between">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-emerald-500/10
              "
            >
              <CreditCard
                className="text-emerald-600"
                size={24}
              />
            </div>

            <span
              className="
                rounded-full
                bg-[#f8fafc]
                px-3
                py-1
                text-xs
                font-semibold
                text-gray-500
              "
            >
              Secured
            </span>

          </div>

          <h3
            className="
              mt-6
              text-sm
              font-medium
              text-gray-500
            "
          >
            Payments
          </h3>

          <p
            className="
              mt-2
              text-3xl
              font-black
              text-[#0f172a]
            "
          >
            ₹0
          </p>
        </div>

      </section>

      {/* Analytics + Activity */}
      <section
        className="
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-3
        "
      >

        {/* Analytics */}
        <div
          className="
            xl:col-span-2
            rounded-[32px]
            border
            border-black/5
            bg-white
            p-6
            shadow-sm
          "
        >

          <div className="flex items-center justify-between">

            <div>
              <h2
                className="
                  text-xl
                  font-black
                  text-[#0f172a]
                "
              >
                Revenue Analytics
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Real-time business insights will appear here.
              </p>
            </div>

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-[#f8fafc]
              "
            >
              <BarChart3
                size={22}
                className="text-gray-700"
              />
            </div>

          </div>

          {/* Empty State */}
          <div
            className="
              mt-8
              flex
              h-[280px]
              items-center
              justify-center
              rounded-[28px]
              border
              border-dashed
              border-black/10
              bg-[#f8fafc]
            "
          >
            <div className="text-center">

              <TrendingUp
                size={42}
                className="mx-auto text-gray-300"
              />

              <h3
                className="
                  mt-4
                  text-lg
                  font-bold
                  text-gray-700
                "
              >
                No analytics available yet
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Analytics will automatically appear once
                invoices and payments are created.
              </p>

            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div
          className="
            rounded-[32px]
            border
            border-black/5
            bg-white
            p-6
            shadow-sm
          "
        >

          <h2
            className="
              text-xl
              font-black
              text-[#0f172a]
            "
          >
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Latest business operations and updates.
          </p>

          <div className="mt-8 space-y-4">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="  flex  items-start  gap-4 rounded-2xl  border  border-black/5 bg-[#f8fafc]  p-4">

                <div
                  className="mt-1  h-3  w-3  rounded-full  bg-blue-500"/>

                <div>
                  <p className="  text-sm font-semibold text-[#0f172a]">
                    Workspace initialized
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Your dashboard environment is ready.
                  </p>
                </div>

              </div>
            ))}

          </div>
        </div>

      </section>

    </div>
  );
}
import { PaperClipIcon } from '@heroicons/react/20/solid'

export default function FinanceDashboard() {
  return (
    <div className="bg-black text-white p-8 rounded-lg shadow-lg">
      <div className="px-4 sm:px-0">
        <h3 className="text-xl font-semibold text-gray-100">Finance Dashboard</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-400">Overview of your financial activities.</p>
      </div>
      <div className="mt-6 border-t border-gray-700">
        <dl className="divide-y divide-gray-700">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-300">Total Income</dt>
            <dd className="mt-1 text-sm text-gray-100 sm:col-span-2 sm:mt-0">$15,000</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-300">Total Expenses</dt>
            <dd className="mt-1 text-sm text-red-400 sm:col-span-2 sm:mt-0">-$8,200</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-300">Savings</dt>
            <dd className="mt-1 text-sm text-green-400 sm:col-span-2 sm:mt-0">$6,800</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-300">Investments</dt>
            <dd className="mt-1 text-sm text-blue-400 sm:col-span-2 sm:mt-0">$12,500</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-300">Debt / Liabilities</dt>
            <dd className="mt-1 text-sm text-orange-400 sm:col-span-2 sm:mt-0">-$3,500</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-300">Financial Reports</dt>
            <dd className="mt-2 text-sm text-gray-100 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-700 rounded-md border border-gray-600">
                <li className="flex items-center justify-between py-4 pr-5 pl-4 text-sm">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon aria-hidden="true" className="size-5 shrink-0 text-gray-400" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">Monthly_Report_February.pdf</span>
                      <span className="shrink-0 text-gray-400">3.2MB</span>
                    </div>
                  </div>
                  <div className="ml-4 shrink-0">
                    <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300">
                      Download
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pr-5 pl-4 text-sm">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon aria-hidden="true" className="size-5 shrink-0 text-gray-400" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">Annual_Summary_2024.pdf</span>
                      <span className="shrink-0 text-gray-400">5.6MB</span>
                    </div>
                  </div>
                  <div className="ml-4 shrink-0">
                    <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300">
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

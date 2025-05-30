// import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
// import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
// import {
//   ArrowPathIcon,
//   ChartPieIcon,
//   CursorArrowRaysIcon,
//   FingerPrintIcon,
//   SquaresPlusIcon,
// } from '@heroicons/react/24/outline'

// const solutions = [
//   { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
//   { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
//   { name: 'Security', description: "Your customers' data will be safe and secure", href: '#', icon: FingerPrintIcon },
//   { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
//   { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
// ]
// const callsToAction = [
//   { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
//   { name: 'Contact sales', href: '#', icon: PhoneIcon },
// ]

// export default function Example() {
//   return (
//     <Popover className="relative">
//       <PopoverButton className="inline-flex items-center gap-x-1 text-sm/6 font-semibold text-white">
//         <span>Solutions</span>
//         <ChevronDownIcon aria-hidden="true" className="size-5" />
//       </PopoverButton>

//       <PopoverPanel
//         transition
//         className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
//       >
//         <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 ring-1 shadow-lg ring-gray-900/5">
//           <div className="p-4">
//             {solutions.map((item) => (
//               <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
//                 <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
//                   <item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
//                 </div>
//                 <div>
//                   <a href={item.href} className="font-semibold text-gray-900">
//                     {item.name}
//                     <span className="absolute inset-0" />
//                   </a>
//                   <p className="mt-1 text-gray-600">{item.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
//             {callsToAction.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
//               >
//                 <item.icon aria-hidden="true" className="size-5 flex-none text-gray-400" />
//                 {item.name}
//               </a>
//             ))}
//           </div>
//         </div>
//       </PopoverPanel>
//     </Popover>
//   )
// }

"use client";
import { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

export default function ExpenseAnalytics() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function fetchExpenses() {
      const res = await fetch("/api/expenses/getExpenses");
      const data = await res.json();
      setExpenses(data);
    }
    fetchExpenses();
  }, []);

  // Transform data for chart
  const chartData = expenses.map(e => ({
    name: `${e._id.month}/${e._id.year}`,
    totalSpent: e.totalSpent
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-xl font-bold mb-4">Expense Analytics</h2>

      {/* Bar Chart for Monthly Expenses */}
      <BarChart width={500} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="totalSpent" fill="#8884d8" />
      </BarChart>

      {/* Pie Chart for Category Wise Expenses */}
      <PieChart width={400} height={300}>
        <Pie data={chartData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="totalSpent">
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}


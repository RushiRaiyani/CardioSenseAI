// import { motion } from "motion/react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
// } from "recharts";
// import { Activity, Heart, Zap, ShieldCheck } from "lucide-react";

// const data = [
//   { name: "Mon", value: 72 },
//   { name: "Tue", value: 78 },
//   { name: "Wed", value: 75 },
//   { name: "Thu", value: 82 },
//   { name: "Fri", value: 79 },
//   { name: "Sat", value: 85 },
//   { name: "Sun", value: 80 },
// ];

// export default function DashboardPreview() {
//   return (
//     <section id="dashboard" className="py-24 bg-white dark:bg-zinc-950">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
//             Real-time Health Dashboard
//           </h2>
//           <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
//             Monitor your cardiovascular health with precision. Our AI analyzes every heartbeat to provide actionable insights.
//           </p>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="relative group"
//         >
//           {/* Glassmorphism Dashboard Container */}
//           <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-zinc-200/50 dark:shadow-none overflow-hidden">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* Left Column: Stats Cards */}
//               <div className="space-y-6">
//                 <div className="p-6 bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500">
//                       <Heart size={20} fill="currentColor" />
//                     </div>
//                     <span className="text-xs font-bold text-teal-500 bg-teal-500/10 px-2 py-1 rounded-lg">Normal</span>
//                   </div>
//                   <p className="text-sm font-medium text-zinc-500 mb-1">Current Heart Rate</p>
//                   <h3 className="text-3xl font-bold text-zinc-900 dark:text-white">72 <span className="text-sm font-normal text-zinc-400">BPM</span></h3>
//                 </div>

//                 <div className="p-6 bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
//                       <Activity size={20} />
//                     </div>
//                     <span className="text-xs font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-lg">Stable</span>
//                   </div>
//                   <p className="text-sm font-medium text-zinc-500 mb-1">Blood Pressure</p>
//                   <h3 className="text-3xl font-bold text-zinc-900 dark:text-white">120/80 <span className="text-sm font-normal text-zinc-400">mmHg</span></h3>
//                 </div>

//                 <div className="p-6 bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500">
//                       <Zap size={20} fill="currentColor" />
//                     </div>
//                     <span className="text-xs font-bold text-teal-500 bg-teal-500/10 px-2 py-1 rounded-lg">Low Risk</span>
//                   </div>
//                   <p className="text-sm font-medium text-zinc-500 mb-1">AI Risk Score</p>
//                   <h3 className="text-3xl font-bold text-zinc-900 dark:text-white">12% <span className="text-sm font-normal text-zinc-400">Probability</span></h3>
//                 </div>
//               </div>

//               {/* Right Column: Main Chart */}
//               <div className="lg:col-span-2 bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-100 dark:border-zinc-800 p-8 shadow-sm flex flex-col">
//                 <div className="flex items-center justify-between mb-8">
//                   <div>
//                     <h4 className="text-lg font-bold text-zinc-900 dark:text-white">Heart Rate Trends</h4>
//                     <p className="text-sm text-zinc-500">Weekly cardiovascular activity</p>
//                   </div>
//                   <div className="flex gap-2">
//                     <button className="px-3 py-1 text-xs font-bold bg-teal-500 text-white rounded-lg">Week</button>
//                     <button className="px-3 py-1 text-xs font-bold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">Month</button>
//                   </div>
//                 </div>

//                 <div className="flex-1 min-h-[300px] w-full">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart data={data}>
//                       <defs>
//                         <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
//                           <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
//                         </linearGradient>
//                       </defs>
//                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//                       <XAxis 
//                         dataKey="name" 
//                         axisLine={false} 
//                         tickLine={false} 
//                         tick={{ fill: '#94a3b8', fontSize: 12 }} 
//                         dy={10}
//                       />
//                       <YAxis 
//                         axisLine={false} 
//                         tickLine={false} 
//                         tick={{ fill: '#94a3b8', fontSize: 12 }} 
//                       />
//                       <Tooltip 
//                         contentStyle={{ 
//                           backgroundColor: '#18181b', 
//                           border: 'none', 
//                           borderRadius: '12px',
//                           color: '#fff'
//                         }}
//                         itemStyle={{ color: '#14b8a6' }}
//                       />
//                       <Area 
//                         type="monotone" 
//                         dataKey="value" 
//                         stroke="#14b8a6" 
//                         strokeWidth={3}
//                         fillOpacity={1} 
//                         fill="url(#colorValue)" 
//                       />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Floating Action Button */}
//           <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 px-6 py-3 rounded-full shadow-xl font-bold text-sm">
//             <ShieldCheck className="text-teal-500" />
//             Your data is encrypted and secure
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

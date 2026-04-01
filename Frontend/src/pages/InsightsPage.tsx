import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Loader2, AlertCircle } from "lucide-react";

interface GraphData {
  age: Record<string, Record<string, number>>;
  gender: Record<string, Record<string, number>>;
  ap_hi: Record<string, Record<string, number>>;
  ap_lo: Record<string, Record<string, number>>;
}

// Recharts charts have their own dark theme handled via CSS variables / props
const TEAL = "#14b8a6";
const RED = "#ef4444";

function ChartCard({
  title,
  subtitle,
  delay,
  children,
}: {
  title: string;
  subtitle: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6 shadow-lg shadow-zinc-200/30 dark:shadow-none"
    >
      <div className="mb-5">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{title}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{subtitle}</p>
      </div>
      <div className="h-[280px]">{children}</div>
    </motion.div>
  );
}

const tooltipStyle = {
  backgroundColor: "#18181b",
  border: "none",
  borderRadius: "12px",
  color: "#fff",
  fontSize: "12px",
};

export default function InsightsPage() {
  const [data, setData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/graph_data")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setError(
          "Could not load chart data. Make sure the Flask server is running on port 5000."
        );
        setLoading(false);
      });
  }, []);

  // Transform age data → [{age, healthy, atRisk}]
  const ageData = data
    ? Object.entries(data.age)
        .map(([age, counts]) => ({
          age: parseInt(age),
          Healthy: counts["0"] ?? 0,
          "At Risk": counts["1"] ?? 0,
        }))
        .sort((a, b) => a.age - b.age)
        .slice(0, 60) // keep chart readable
    : [];

  // Transform gender data → bar chart
  const genderData = data
    ? [
        {
          name: "Male",
          Cases: data.gender["1"]?.["1"] ?? 0,
        },
        {
          name: "Female",
          Cases: data.gender["2"]?.["1"] ?? 0,
        },
      ]
    : [];

  // Transform ap_hi data
  const apHiData = data
    ? Object.entries(data.ap_hi)
        .map(([bp, counts]) => ({
          bp: parseInt(bp),
          Healthy: counts["0"] ?? 0,
          "At Risk": counts["1"] ?? 0,
        }))
        .sort((a, b) => a.bp - b.bp)
        .filter((d) => d.bp >= 60 && d.bp <= 200)
    : [];

  // Transform ap_lo data
  const apLoData = data
    ? Object.entries(data.ap_lo)
        .map(([bp, counts]) => ({
          bp: parseInt(bp),
          Healthy: counts["0"] ?? 0,
          "At Risk": counts["1"] ?? 0,
        }))
        .sort((a, b) => a.bp - b.bp)
        .filter((d) => d.bp >= 40 && d.bp <= 150)
    : [];

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900 text-teal-600 dark:text-teal-400 text-xs font-semibold mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            Live Dataset Analytics
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
            Data Insights Dashboard
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl mx-auto">
            Visual analysis from our training dataset of 70,000 health records.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-zinc-500">
            <Loader2 className="w-10 h-10 animate-spin text-teal-500" />
            <p className="text-sm font-medium">Loading chart data from backend…</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto p-5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-3"
          >
            <AlertCircle size={20} />
            {error}
          </motion.div>
        )}

        {/* Charts Grid */}
        {data && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Age Distribution */}
            <ChartCard
              title="Age Distribution vs Cardiovascular Risk"
              subtitle="Correlation between age and risk across the dataset"
              delay={0}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ageData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e4e4e7" strokeOpacity={0.5} />
                  <XAxis
                    dataKey="age"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    label={{ value: "Age", position: "insideBottom", offset: -2, fill: "#94a3b8", fontSize: 11 }}
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: TEAL }} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Line type="monotone" dataKey="Healthy" stroke={TEAL} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey="At Risk" stroke={RED} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Gender Analysis */}
            <ChartCard
              title="Gender Analysis"
              subtitle="Cardiovascular cases across gender demographics"
              delay={0.1}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={genderData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e4e4e7" strokeOpacity={0.5} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(20,184,166,0.05)" }} />
                  <Bar
                    dataKey="Cases"
                    fill={TEAL}
                    radius={[8, 8, 0, 0]}
                    maxBarSize={70}
                    label={{ position: "top", fill: "#94a3b8", fontSize: 11 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Systolic BP */}
            <ChartCard
              title="Systolic Blood Pressure"
              subtitle="High blood pressure influence on health outcomes"
              delay={0.2}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={apHiData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e4e4e7" strokeOpacity={0.5} />
                  <XAxis
                    dataKey="bp"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    label={{ value: "mmHg", position: "insideBottom", offset: -2, fill: "#94a3b8", fontSize: 11 }}
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Line type="monotone" dataKey="Healthy" stroke={TEAL} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey="At Risk" stroke={RED} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Diastolic BP */}
            <ChartCard
              title="Diastolic Blood Pressure"
              subtitle="Impact of lower pressure readings on heart risk"
              delay={0.3}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={apLoData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e4e4e7" strokeOpacity={0.5} />
                  <XAxis
                    dataKey="bp"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    label={{ value: "mmHg", position: "insideBottom", offset: -2, fill: "#94a3b8", fontSize: 11 }}
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Line type="monotone" dataKey="Healthy" stroke={TEAL} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey="At Risk" stroke={RED} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        )}

        {/* Footer note */}
        {data && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-xs text-zinc-400 mt-10"
          >
            All visualizations generated in real-time from the anonymized 70,000-record patient dataset.
          </motion.p>
        )}
      </div>
    </div>
  );
}

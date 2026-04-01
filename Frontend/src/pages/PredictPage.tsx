import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Droplets,
  Activity,
  AlertCircle,
  CheckCircle2,
  TriangleAlert,
  Loader2,
} from "lucide-react";

interface FormData {
  gender: string;
  age_years: string;
  height: string;
  weight: string;
  ap_hi: string;
  ap_lo: string;
  cholesterol: string;
  gluc: string;
  smoke: string;
  alco: string;
  active: string;
}

interface PredictResult {
  prediction: number;
  probability: number;
  bmi: number;
  bmiCategory: string;
}

function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

function RiskIcon({ level }: { level: "low" | "moderate" | "high" }) {
  if (level === "low") return <CheckCircle2 className="w-8 h-8 text-emerald-500" />;
  if (level === "moderate") return <TriangleAlert className="w-8 h-8 text-amber-500" />;
  return <AlertCircle className="w-8 h-8 text-red-500" />;
}

export default function PredictPage() {
  const [form, setForm] = useState<FormData>({
    gender: "1",
    age_years: "",
    height: "",
    weight: "",
    ap_hi: "",
    ap_lo: "",
    cholesterol: "1",
    gluc: "1",
    smoke: "0",
    alco: "0",
    active: "1",
  });
  const [result, setResult] = useState<PredictResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const heightM = parseFloat(form.height) / 100;
    const bmi = parseFloat(
      (parseFloat(form.weight) / (heightM * heightM)).toFixed(1)
    );

    const payload = {
      ...form,
      bmi,
      age_years: parseInt(form.age_years),
    };

    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
      const res = await fetch(`${API_BASE}/api/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setResult({
        prediction: data.prediction,
        probability: data.probability,
        bmi,
        bmiCategory: getBMICategory(bmi),
      });
      setTimeout(() => {
        document
          .getElementById("result-card")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } catch {
      setError("Failed to get prediction. Make sure the Flask server is running.");
    } finally {
      setLoading(false);
    }
  };

  const percent = result ? (result.probability * 100).toFixed(1) : "0";
  const riskLevel: "low" | "moderate" | "high" =
    result
      ? result.probability < 0.33
        ? "low"
        : result.probability < 0.66
        ? "moderate"
        : "high"
      : "low";

  const riskConfig = {
    low: {
      label: "LOW RISK",
      bar: "bg-emerald-500",
      bg: "bg-emerald-500/10 border-emerald-500/30",
      text: "text-emerald-600 dark:text-emerald-400",
    },
    moderate: {
      label: "MODERATE RISK",
      bar: "bg-amber-500",
      bg: "bg-amber-500/10 border-amber-500/30",
      text: "text-amber-600 dark:text-amber-400",
    },
    high: {
      label: "HIGH RISK",
      bar: "bg-red-500",
      bg: "bg-red-500/10 border-red-500/30",
      text: "text-red-600 dark:text-red-400",
    },
  };

  const inputBase =
    "w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all";
  const labelBase = "block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2";
  const sectionHeader =
    "flex items-center gap-2 text-base font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-6 pb-3 border-b border-zinc-100 dark:border-zinc-800";

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900 text-teal-600 dark:text-teal-400 text-xs font-semibold mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            AI-Powered Assessment
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
            Health Risk Assessment
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl mx-auto">
            Provide your health metrics below for a precise cardiovascular risk
            analysis by our AI model.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-8 md:p-10 shadow-xl shadow-zinc-200/40 dark:shadow-none"
        >
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Physical Metrics */}
            <div>
              <div className={sectionHeader}>
                <User size={18} />
                Physical Metrics
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <div>
                  <label className={labelBase}>Gender</label>
                  <select name="gender" value={form.gender} onChange={handleChange} className={inputBase}>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                  </select>
                </div>
                <div>
                  <label className={labelBase}>Age (Years)</label>
                  <input
                    type="number" name="age_years" value={form.age_years}
                    onChange={handleChange} required min={1} max={120}
                    placeholder="e.g. 45" className={inputBase}
                  />
                </div>
                <div>
                  <label className={labelBase}>Height (cm)</label>
                  <input
                    type="number" name="height" value={form.height}
                    onChange={handleChange} required min={80} max={260}
                    placeholder="e.g. 175" className={inputBase}
                  />
                </div>
                <div>
                  <label className={labelBase}>Weight (kg)</label>
                  <input
                    type="number" name="weight" value={form.weight}
                    onChange={handleChange} required min={10} max={300}
                    placeholder="e.g. 70" className={inputBase}
                  />
                </div>
              </div>
            </div>

            {/* Medical Indicators */}
            <div>
              <div className={sectionHeader}>
                <Droplets size={18} />
                Medical Indicators
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className={labelBase}>Systolic BP (High)</label>
                  <input
                    type="number" name="ap_hi" value={form.ap_hi}
                    onChange={handleChange} required min={50} max={300}
                    placeholder="e.g. 120" className={inputBase}
                  />
                </div>
                <div>
                  <label className={labelBase}>Diastolic BP (Low)</label>
                  <input
                    type="number" name="ap_lo" value={form.ap_lo}
                    onChange={handleChange} required min={20} max={200}
                    placeholder="e.g. 80" className={inputBase}
                  />
                </div>
                <div>
                  <label className={labelBase}>Cholesterol</label>
                  <select name="cholesterol" value={form.cholesterol} onChange={handleChange} className={inputBase}>
                    <option value="1">Normal</option>
                    <option value="2">Above Normal</option>
                    <option value="3">High</option>
                  </select>
                </div>
                <div>
                  <label className={labelBase}>Glucose Level</label>
                  <select name="gluc" value={form.gluc} onChange={handleChange} className={inputBase}>
                    <option value="1">Normal</option>
                    <option value="2">Above Normal</option>
                    <option value="3">High</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Lifestyle Habits */}
            <div>
              <div className={sectionHeader}>
                <Activity size={18} />
                Lifestyle Habits
              </div>
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <label className={labelBase}>Smoking</label>
                  <select name="smoke" value={form.smoke} onChange={handleChange} className={inputBase}>
                    <option value="0">Non-Smoker</option>
                    <option value="1">Smoker</option>
                  </select>
                </div>
                <div>
                  <label className={labelBase}>Alcohol</label>
                  <select name="alco" value={form.alco} onChange={handleChange} className={inputBase}>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>
                <div>
                  <label className={labelBase}>Physical Activity</label>
                  <select name="active" value={form.active} onChange={handleChange} className={inputBase}>
                    <option value="1">Active</option>
                    <option value="0">Sedentary</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-bold text-lg rounded-2xl transition-all shadow-sm dark:bg-teal-500 dark:hover:bg-teal-600 dark:shadow-md dark:shadow-teal-500/20 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Generate Prediction Result"
                )}
              </button>
            </div>
          </form>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-2"
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          {/* Result Card */}
          <AnimatePresence>
            {result && (
              <motion.div
                id="result-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="mt-8 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/50"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* BMI */}
                  <div className="text-center p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                      Body Mass Index
                    </p>
                    <p className="text-4xl font-bold text-zinc-900 dark:text-white mb-1">
                      {result.bmi}
                    </p>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        result.bmiCategory === "Normal"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : result.bmiCategory === "Overweight"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : "bg-red-500/10 text-red-600 dark:text-red-400"
                      }`}
                    >
                      {result.bmiCategory}
                    </span>
                  </div>

                  {/* Risk % */}
                  <div className="text-center p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                      Risk Probability
                    </p>
                    <p className="text-4xl font-bold text-teal-500 mb-1">{percent}%</p>
                    <p className="text-xs text-zinc-500">Cardiovascular risk score</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-5">
                  <div className="w-full h-3 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-full rounded-full ${riskConfig[riskLevel].bar}`}
                    />
                  </div>
                </div>

                {/* Risk Label */}
                <div
                  className={`flex items-center justify-center gap-3 p-4 rounded-2xl border ${riskConfig[riskLevel].bg}`}
                >
                  <RiskIcon level={riskLevel} />
                  <span
                    className={`text-2xl font-black tracking-wider ${riskConfig[riskLevel].text}`}
                  >
                    {riskConfig[riskLevel].label}
                  </span>
                </div>

                <p className="text-center text-xs text-zinc-400 mt-4">
                  For educational purposes only. Always consult a qualified medical professional.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

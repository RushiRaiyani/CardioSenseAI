import { motion } from "motion/react";
import { ClipboardCheck, Activity, BrainCircuit, FileText } from "lucide-react";

const steps = [
  {
    icon: <ClipboardCheck className="text-teal-500" />,
    title: "Complete Assessment",
    description: "Fill out a comprehensive health profile and provide your latest cardiovascular data.",
  },
  {
    icon: <Activity className="text-blue-500" />,
    title: "Family Sharing",
    description: "Securely share your health status with family members or healthcare providers for better care.",
  },
  {
    icon: <BrainCircuit className="text-purple-500" />,
    title: "AI Analysis",
    description: "Our advanced AI models analyze your data to identify patterns and potential risks.",
  },
  {
    icon: <FileText className="text-indigo-500" />,
    title: "Get Insights",
    description: "Receive a detailed heart health report with actionable recommendations.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
            How CardioSense AI Works
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
            Our process is designed to be simple, secure, and highly effective for your heart health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-100 dark:bg-zinc-800 -translate-y-1/2 -z-10" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-white dark:bg-zinc-900 border-4 border-zinc-50 dark:border-zinc-800 rounded-full flex items-center justify-center mb-8 shadow-xl group-hover:border-teal-500/20 transition-colors duration-500">
                <div className="w-14 h-14 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-inner">
                  {step.icon}
                </div>
              </div>
              <div className="relative">
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-5xl font-black text-zinc-50 dark:text-zinc-900 -z-10">
                  0{i + 1}
                </span>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

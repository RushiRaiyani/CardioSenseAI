import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export default function ModelInfo() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight">
              Precision-Trained AI
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
              Our prediction engine is built on rigorous medical data analysis.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-teal-500 shrink-0 mt-1" />
                <div>
                  <h4 className="text-zinc-900 dark:text-white font-bold text-lg">Random Forest Architecture:</h4>
                  <p className="text-zinc-600 dark:text-zinc-400">High-performance ensemble learning for reliable health classification.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-teal-500 shrink-0 mt-1" />
                <div>
                  <h4 className="text-zinc-900 dark:text-white font-bold text-lg">70,000 Patient Records:</h4>
                  <p className="text-zinc-600 dark:text-zinc-400">Trained on a massive, diverse dataset to ensure wide-range applicability.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-teal-500 shrink-0 mt-1" />
                <div>
                  <h4 className="text-zinc-900 dark:text-white font-bold text-lg">12 Vital Features:</h4>
                  <p className="text-zinc-600 dark:text-zinc-400">Analyzing blood pressure, cholesterol, BMI, and lifestyle habits in real-time.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-10 rounded-[2rem] bg-white dark:bg-zinc-950 border-2 border-teal-500 shadow-xl shadow-teal-500/10"
          >
            <h4 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">
              Why These Metrics Matter?
            </h4>
            
            <div className="space-y-8">
              <div>
                <span className="inline-block px-3 py-1 bg-teal-500 text-white text-xs font-bold rounded-full mb-3 tracking-wide">
                  Blood Pressure
                </span>
                <p className="text-zinc-600 dark:text-zinc-400">
                  A key indicator of strain on your heart and arteries.
                </p>
              </div>
              
              <div>
                <span className="inline-block px-3 py-1 bg-teal-500 text-white text-xs font-bold rounded-full mb-3 tracking-wide">
                  BMI
                </span>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Excess weight increases the risk of cardiovascular events significantly.
                </p>
              </div>
              
              <div>
                <span className="inline-block px-3 py-1 bg-teal-500 text-white text-xs font-bold rounded-full mb-3 tracking-wide">
                  Cholesterol
                </span>
                <p className="text-zinc-600 dark:text-zinc-400">
                  High levels can lead to artery-clogging plaque buildup.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

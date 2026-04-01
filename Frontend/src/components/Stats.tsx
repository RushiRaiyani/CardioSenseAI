import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "motion/react";

interface CounterProps {
  value?: number;
  textValue?: string;
  suffix?: string;
  label: string;
}

function Counter({ value, textValue, suffix = "", label }: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const displayValue = useTransform(spring, (v) => Math.floor(v).toLocaleString());

  useEffect(() => {
    if (isInView && value !== undefined) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <div ref={ref} className="text-center p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-center">
      <div className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center justify-center">
        {value !== undefined ? (
          <motion.span>{displayValue}</motion.span>
        ) : (
          <span>{textValue}</span>
        )}
        <span className="text-teal-500">{suffix}</span>
      </div>
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-widest">{label}</p>
    </div>
  );
}

export default function Stats() {
  const stats = [
    { value: 70000, suffix: "+", label: "Medical Records" },
    { value: 74, suffix: "%", label: "Model Accuracy" },
    { textValue: "Instant", label: "Result Delivery" },
  ];

  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Counter {...stat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


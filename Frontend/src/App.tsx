import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import HowItWorks from "./components/HowItWorks";
import ModelInfo from "./components/ModelInfo";
import PredictPage from "./pages/PredictPage";
import InsightsPage from "./pages/InsightsPage";
import { Link } from "react-router-dom";

// Animated page wrapper
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <Stats />
      <HowItWorks />
      <ModelInfo />

      {/* Dataset Insights Preview CTA */}
      <section className="py-24 bg-teal-500 dark:bg-teal-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Explore Data Insights
          </h2>
          <p className="text-teal-50 text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Gain a deeper understanding of cardiovascular trends. Our platform provides visual analytics based on the comprehensive training dataset.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/insights"
              className="px-10 py-5 bg-white text-teal-600 rounded-2xl font-bold text-xl hover:bg-teal-50 transition-all shadow-xl shadow-teal-900/20"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} style={{ width: "100%" }}>
        <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/predict"
          element={
            <PageTransition>
              <PredictPage />
            </PageTransition>
          }
        />
        <Route
          path="/insights"
          element={
            <PageTransition>
              <InsightsPage />
            </PageTransition>
          }
        />
      </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500 selection:bg-teal-500/30">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
}

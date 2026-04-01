import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Menu, X, Moon, Sun } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { cn } from "@/src/lib/utils";

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Predict", to: "/predict" },
    { name: "Insights", to: "/insights" },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-sm font-medium transition-colors",
      isActive
        ? "text-teal-600 dark:text-teal-400"
        : "text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400"
    );

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled
          ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 py-3"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center shadow-sm dark:shadow-md dark:shadow-teal-500/20">
            <Heart className="text-white w-6 h-6" fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            CardioSense<span className="text-teal-600 dark:text-teal-400">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              end={link.to === "/"}
              className={linkClass}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Desktop CTA Button (UPDATED) */}
          <Link
            to="/predict"
            className={cn(
              "hidden md:block px-5 py-2 rounded-full text-sm font-semibold transition-all",
              "bg-teal-600 text-white hover:bg-teal-700",
              "shadow-sm",
              "dark:bg-teal-500 dark:hover:bg-teal-600 dark:shadow-md dark:shadow-teal-500/20"
            )}
          >
            Start Assessment
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-zinc-600 dark:text-zinc-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "text-lg font-medium",
                      isActive
                        ? "text-teal-600 dark:text-teal-400"
                        : "text-zinc-600 dark:text-zinc-400"
                    )
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}

              {/* Mobile CTA Button (UPDATED) */}
              <Link
                to="/predict"
                className={cn(
                  "w-full py-3 rounded-xl font-semibold text-center transition-colors",
                  "bg-teal-600 text-white hover:bg-teal-700",
                  "shadow-sm",
                  "dark:bg-teal-500 dark:hover:bg-teal-600"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start Assessment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu as MenuIcon, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import Logo from "./Logo";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { count, openCart, lastAddedAt } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/menu${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-ink/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-[72px] items-center justify-between gap-4">
          <Logo />

          <nav className="hidden lg:flex items-center gap-8">
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative text-sm font-semibold transition-colors hover:text-ketchup ${
                    active ? "text-ink" : "text-ink-soft/80"
                  }`}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-[3px] rounded-full bg-ketchup"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <form onSubmit={submitSearch} className="hidden md:flex items-center">
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-card border border-ink/5 focus-within:border-ketchup/40 transition-colors">
                <Search size={16} className="text-ink-soft/50 shrink-0" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search your favorite burger..."
                  className="w-44 bg-transparent text-xs outline-none placeholder:text-ink-soft/40"
                />
              </div>
            </form>

            <Link
              href="/contact"
              aria-label="Account"
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-card border border-ink/5 hover:text-ketchup transition-colors"
            >
              <User size={18} />
            </Link>

            <button
              onClick={openCart}
              aria-label="Open cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-card border border-ink/5 hover:text-ketchup transition-colors"
            >
              <ShoppingCart size={18} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={lastAddedAt}
                    initial={{ scale: 0.4 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 18 }}
                    className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-ketchup px-1 text-[10px] font-bold text-white"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-card border border-ink/5"
            >
              {mobileOpen ? <X size={18} /> : <MenuIcon size={18} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-ink/5 bg-cream"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              <form onSubmit={submitSearch} className="md:hidden mb-3">
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-card border border-ink/5">
                  <Search size={16} className="text-ink-soft/50" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search your favorite burger..."
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </form>
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                    pathname === l.href ? "bg-mustard/20 text-ink" : "text-ink-soft/80"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

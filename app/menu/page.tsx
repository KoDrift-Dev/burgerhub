"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, Search } from "lucide-react";
import { CATEGORIES, MENU_ITEMS, type Category } from "@/lib/menu";
import MenuCard from "@/components/MenuCard";
import CategoryIcon from "@/components/CategoryIcon";
import Reveal from "@/components/Reveal";
import { Script } from "@/components/SectionHead";

function MenuInner() {
  const params = useSearchParams();
  const initialCat = (params.get("cat") as Category | null) ?? "All";
  const initialQ = params.get("q") ?? "";

  const [cat, setCat] = useState<Category | "All">(
    (CATEGORIES.some((c) => c.name === initialCat) ? initialCat : "All") as Category | "All",
  );
  const [q, setQ] = useState(initialQ);

  const items = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return MENU_ITEMS.filter((m) => {
      const okCat = cat === "All" || m.category === cat;
      const okQ =
        !needle ||
        m.name.toLowerCase().includes(needle) ||
        m.description.toLowerCase().includes(needle);
      return okCat && okQ;
    });
  }, [cat, q]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-14">
      <Reveal>
        <p className="text-[11px] font-bold tracking-[0.28em] text-ketchup uppercase text-center">Our Menu</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight text-center">
          Taste the <Script>Goodness</Script>
        </h1>
        <p className="mt-3 text-center text-sm text-ink-soft/70 max-w-lg mx-auto">
          24 handcrafted items across 7 categories. Everything made fresh, right when you order.
        </p>
      </Reveal>

      {/* search */}
      <Reveal delay={0.08}>
        <div className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full bg-white px-5 py-3 shadow-card border border-ink/5 focus-within:border-ketchup/40 transition-colors">
          <Search size={17} className="text-ink-soft/50 shrink-0" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search burgers, fries, shakes..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-ink-soft/40"
          />
        </div>
      </Reveal>

      {/* filter pills */}
      <Reveal delay={0.12}>
        <div className="no-scrollbar mt-6 flex gap-2.5 overflow-x-auto pb-2 justify-start md:justify-center">
          {(["All", ...CATEGORIES.map((c) => c.name)] as const).map((c) => {
            const active = cat === c;
            const iconName = CATEGORIES.find((x) => x.name === c)?.icon ?? "Hamburger";
            return (
              <button
                key={c}
                onClick={() => setCat(c as Category | "All")}
                className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all active:scale-95 ${
                  active
                    ? "bg-ink text-white shadow-card"
                    : "bg-white text-ink-soft/80 shadow-card border border-ink/5 hover:border-ketchup/30"
                }`}
              >
                <span className={active ? "text-mustard" : "text-ketchup"}>
                  {c === "All" ? <LayoutGrid size={15} /> : <CategoryIcon name={iconName} size={15} />}
                </span>
                {c}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* grid */}
      {items.length > 0 ? (
        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25 }}
              >
                <MenuCard item={item} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="mt-16 text-center">
          <p className="font-script text-4xl text-ketchup">Oops!</p>
          <p className="mt-2 font-bold text-lg">Nothing matched that craving.</p>
          <p className="text-sm text-ink-soft/60">Try a different search or category.</p>
          <button
            onClick={() => { setQ(""); setCat("All"); }}
            className="mt-5 rounded-full bg-ketchup px-6 py-2.5 text-sm font-bold text-white hover:bg-ketchup-dark"
          >
            Show Everything
          </button>
        </div>
      )}
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center font-bold">Loading menu...</div>}>
      <MenuInner />
    </Suspense>
  );
}

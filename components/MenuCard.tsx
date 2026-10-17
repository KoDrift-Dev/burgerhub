"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { formatPKR, type Badge, type MenuItem } from "@/lib/menu";
import { useCart } from "@/lib/cart";

const BADGE_STYLES: Record<Badge, string> = {
  "Best Seller": "bg-mustard text-ink",
  Spicy: "bg-ketchup text-white",
  Popular: "bg-ink text-white",
  New: "bg-mustard text-ink",
};

export function BadgeSticker({ badge }: { badge: Badge }) {
  return (
    <span
      className={`absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[11px] font-bold shadow-card transition-transform group-hover:animate-wiggle ${BADGE_STYLES[badge]}`}
    >
      {badge}
    </span>
  );
}

export default function MenuCard({ item, index = 0 }: { item: MenuItem; index?: number }) {
  const { add, openCart } = useCart();

  const handleAdd = () => {
    add(item.id);
    openCart();
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group flex flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-card border border-ink/5"
    >
      <div className="relative overflow-hidden">
        {item.badge && <BadgeSticker badge={item.badge} />}
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-108"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft/70">
          <Star size={13} className="fill-mustard text-mustard" />
          {item.rating.toFixed(1)}
          <span className="text-ink-soft/40">({item.reviews.toLocaleString()})</span>
        </div>
        <h3 className="mt-1.5 font-bold text-[17px] tracking-tight">{item.name}</h3>
        <p className="mt-1 flex-1 text-[13px] leading-relaxed text-ink-soft/70 line-clamp-2">
          {item.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-lg font-extrabold">{formatPKR(item.price)}</span>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 rounded-full bg-ketchup px-5 py-2.5 text-sm font-bold text-white shadow-pop transition-all hover:bg-ketchup-dark hover:shadow-lg active:scale-95"
          >
            <ShoppingCart size={15} />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.article>
  );
}

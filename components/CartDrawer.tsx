"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, Truck, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { FREE_DELIVERY_THRESHOLD, formatPKR, getItem } from "@/lib/menu";

export default function CartDrawer() {
  const { lines, subtotal, isOpen, closeCart, setQty, remove } = useCart();
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="drawer-shadow fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-ink/8">
              <h2 className="flex items-center gap-2 text-lg font-extrabold">
                <ShoppingBag size={20} className="text-ketchup" />
                Your Cart
                <span className="rounded-full bg-mustard px-2.5 py-0.5 text-xs font-bold">
                  {lines.reduce((a, l) => a + l.qty, 0)}
                </span>
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-card hover:text-ketchup"
              >
                <X size={18} />
              </button>
            </div>

            {lines.length > 0 && (
              <div className="px-6 pt-4">
                <div className="rounded-2xl bg-white p-4 shadow-card border border-ink/5">
                  <p className="flex items-center gap-2 text-xs font-semibold text-ink-soft/80">
                    <Truck size={15} className="text-ketchup" />
                    {remaining > 0 ? (
                      <>Add <b className="text-ketchup">{formatPKR(remaining)}</b> more for FREE delivery</>
                    ) : (
                      <span className="text-green-700 font-bold">You unlocked FREE delivery!</span>
                    )}
                  </p>
                  <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-cream-dark">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-mustard to-ketchup"
                      animate={{ width: `${progress}%` }}
                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center gap-3">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-cream-dark">
                    <ShoppingBag size={32} className="text-ink-soft/40" />
                  </span>
                  <p className="font-bold text-lg">Your cart is craving!</p>
                  <p className="text-sm text-ink-soft/60 max-w-[220px]">
                    Add some juicy burgers and crispy fries to get started.
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-2 rounded-full bg-ketchup px-6 py-2.5 text-sm font-bold text-white hover:bg-ketchup-dark"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => {
                      const item = getItem(line.id);
                      return (
                        <motion.li
                          key={line.id}
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 40 }}
                          className="flex gap-3 rounded-2xl bg-white p-3 shadow-card border border-ink/5"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-20 w-20 shrink-0 rounded-xl object-cover"
                          />
                          <div className="flex flex-1 flex-col min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-bold leading-tight">{item.name}</p>
                              <button
                                onClick={() => remove(line.id)}
                                aria-label={`Remove ${item.name}`}
                                className="text-ink-soft/40 hover:text-ketchup shrink-0"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                            <p className="text-xs text-ink-soft/60">{formatPKR(item.price)} each</p>
                            <div className="mt-auto flex items-center justify-between pt-2">
                              <div className="flex items-center gap-2 rounded-full bg-cream px-1.5 py-1">
                                <button
                                  onClick={() => setQty(line.id, line.qty - 1)}
                                  aria-label="Decrease quantity"
                                  className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm hover:text-ketchup"
                                >
                                  <Minus size={13} />
                                </button>
                                <span className="w-6 text-center text-sm font-bold">{line.qty}</span>
                                <button
                                  onClick={() => setQty(line.id, line.qty + 1)}
                                  aria-label="Increase quantity"
                                  className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm hover:text-ketchup"
                                >
                                  <Plus size={13} />
                                </button>
                              </div>
                              <span className="text-sm font-extrabold">
                                {formatPKR(item.price * line.qty)}
                              </span>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-ink/8 bg-white px-6 py-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-soft/70">Subtotal</span>
                  <span className="text-xl font-extrabold">{formatPKR(subtotal)}</span>
                </div>
                <p className="mt-1 text-xs text-ink-soft/50">Delivery fee calculated at checkout.</p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="mt-4 flex items-center justify-center gap-2 rounded-full bg-ketchup py-3.5 font-bold text-white shadow-pop hover:bg-ketchup-dark transition-colors"
                >
                  Proceed to Checkout <ArrowRight size={17} />
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, BadgeCheck, Banknote, CheckCircle2, CreditCard,
  MapPin, Minus, Plus, ShoppingBag, Store, Trash2, Truck,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, formatPKR, getItem } from "@/lib/menu";
import Reveal from "@/components/Reveal";
import { Script } from "@/components/SectionHead";

const inputCls =
  "w-full rounded-2xl border border-ink/10 bg-white px-5 py-3.5 text-sm outline-none placeholder:text-ink-soft/40 focus:border-ketchup/50 focus:ring-2 focus:ring-ketchup/15 transition";

type OrderType = "delivery" | "pickup";

function makeOrderNumber() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `BH-${s}`;
}

export default function CheckoutPage() {
  const { lines, subtotal, setQty, remove, clear } = useCart();
  const [orderType, setOrderType] = useState<OrderType>("delivery");
  const [payment, setPayment] = useState<"cod" | "card">("cod");
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "Lahore", notes: "" });
  const [orderNo, setOrderNo] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const deliveryFee = orderType === "pickup" || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  const valid = useMemo(() => {
    if (!form.name.trim() || !/^0?3\d{9}$/.test(form.phone.replace(/[\s-]/g, ""))) return false;
    if (orderType === "delivery" && !form.address.trim()) return false;
    return true;
  }, [form, orderType]);

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid || lines.length === 0) return;
    setOrderNo(makeOrderNumber());
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  if (orderNo) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16 md:py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 15, delay: 0.1 }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-700"
          >
            <CheckCircle2 size={48} />
          </motion.span>
          <p className="mt-6 font-script text-4xl text-ketchup">Order confirmed!</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
            Thanks, {form.name.split(" ")[0]}!
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink-soft/70">
            {orderType === "delivery"
              ? "Your food is being prepared and will arrive hot in about 30–40 minutes."
              : "Your order will be ready for pickup in about 15–20 minutes."}{" "}
            We&apos;ll call you at <b>{form.phone}</b> with any updates.
          </p>
          <div className="mx-auto mt-8 max-w-sm rounded-[1.75rem] bg-white p-6 shadow-card border border-ink/5">
            <p className="text-xs font-bold tracking-[0.2em] text-ink-soft/50 uppercase">Order Number</p>
            <p className="mt-1 text-3xl font-extrabold tracking-widest text-ketchup">{orderNo}</p>
            <div className="mt-4 space-y-2 border-t border-dashed border-ink/10 pt-4 text-sm">
              <div className="flex justify-between"><span className="text-ink-soft/60">Items total</span><b>{formatPKR(total - deliveryFee)}</b></div>
              <div className="flex justify-between"><span className="text-ink-soft/60">Delivery</span><b>{deliveryFee === 0 ? "FREE" : formatPKR(deliveryFee)}</b></div>
              <div className="flex justify-between text-base"><span className="font-bold">Paid total</span><span className="font-extrabold">{formatPKR(total)}</span></div>
              <div className="flex justify-between"><span className="text-ink-soft/60">Payment</span><b>{payment === "cod" ? "Cash on Delivery" : "Card on Delivery"}</b></div>
            </div>
          </div>
          <Link
            href="/menu"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ketchup px-8 py-3.5 font-bold text-white shadow-pop hover:bg-ketchup-dark transition-all active:scale-95"
          >
            Order More <ArrowRight size={17} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-14">
      <Reveal>
        <p className="text-[11px] font-bold tracking-[0.28em] text-ketchup uppercase">Almost There</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
          <Script>Checkout</Script>
        </h1>
      </Reveal>

      {lines.length === 0 ? (
        <div className="mt-14 flex flex-col items-center text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-cream-dark">
            <ShoppingBag size={32} className="text-ink-soft/40" />
          </span>
          <p className="mt-4 text-xl font-extrabold">Your cart is empty</p>
          <p className="mt-1 text-sm text-ink-soft/60">Add something delicious first.</p>
          <Link href="/menu" className="mt-6 inline-flex items-center gap-2 rounded-full bg-ketchup px-7 py-3 text-sm font-bold text-white hover:bg-ketchup-dark">
            <ArrowLeft size={16} /> Back to Menu
          </Link>
        </div>
      ) : (
        <form onSubmit={placeOrder} className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] items-start">
          <div className="space-y-6">
            {/* order type */}
            <Reveal>
              <div className="rounded-[1.75rem] bg-white p-6 shadow-card border border-ink/5">
                <h2 className="font-extrabold text-lg">Order Type</h2>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {(
                    [
                      { v: "delivery", icon: Truck, t: "Delivery", s: "30–40 min" },
                      { v: "pickup", icon: Store, t: "Pickup", s: "15–20 min" },
                    ] as const
                  ).map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => setOrderType(o.v)}
                      className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all active:scale-[0.98] ${
                        orderType === o.v ? "border-ketchup bg-ketchup/5" : "border-ink/10 hover:border-ink/25"
                      }`}
                    >
                      <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${orderType === o.v ? "bg-ketchup text-white" : "bg-cream-dark/60 text-ink-soft"}`}>
                        <o.icon size={20} />
                      </span>
                      <span>
                        <span className="block text-sm font-bold">{o.t}</span>
                        <span className="block text-xs text-ink-soft/60">{o.s}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* details */}
            <Reveal delay={0.06}>
              <div className="rounded-[1.75rem] bg-white p-6 shadow-card border border-ink/5">
                <h2 className="font-extrabold text-lg">Your Details</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <input required placeholder="Full name *" value={form.name} onChange={set("name")} className={inputCls} />
                  <div>
                    <input
                      required
                      placeholder="Phone (03XX XXXXXXX) *"
                      value={form.phone}
                      onChange={set("phone")}
                      className={`${inputCls} ${touched && !/^0?3\d{9}$/.test(form.phone.replace(/[\s-]/g, "")) ? "border-ketchup ring-2 ring-ketchup/15" : ""}`}
                    />
                    {touched && !/^0?3\d{9}$/.test(form.phone.replace(/[\s-]/g, "")) && (
                      <p className="mt-1 text-xs text-ketchup font-semibold">Enter a valid 11-digit mobile number.</p>
                    )}
                  </div>
                </div>
                {orderType === "delivery" && (
                  <div className="mt-4 grid gap-4 sm:grid-cols-[1.6fr_1fr]">
                    <div className="relative">
                      <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft/40" />
                      <input required placeholder="Street address *" value={form.address} onChange={set("address")} className={`${inputCls} pl-11`} />
                    </div>
                    <input placeholder="City" value={form.city} onChange={set("city")} className={inputCls} />
                  </div>
                )}
                <textarea rows={2} placeholder="Notes for the rider (optional)" value={form.notes} onChange={set("notes")} className={`${inputCls} mt-4 resize-none`} />
              </div>
            </Reveal>

            {/* payment */}
            <Reveal delay={0.1}>
              <div className="rounded-[1.75rem] bg-white p-6 shadow-card border border-ink/5">
                <h2 className="font-extrabold text-lg">Payment</h2>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {(
                    [
                      { v: "cod", icon: Banknote, t: "Cash on Delivery" },
                      { v: "card", icon: CreditCard, t: "Card on Delivery" },
                    ] as const
                  ).map((p) => (
                    <button
                      key={p.v}
                      type="button"
                      onClick={() => setPayment(p.v)}
                      className={`flex items-center gap-3 rounded-2xl border-2 p-4 transition-all active:scale-[0.98] ${
                        payment === p.v ? "border-ketchup bg-ketchup/5" : "border-ink/10 hover:border-ink/25"
                      }`}
                    >
                      <p.icon size={20} className={payment === p.v ? "text-ketchup" : "text-ink-soft/50"} />
                      <span className="text-sm font-bold">{p.t}</span>
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* summary */}
          <Reveal delay={0.08}>
            <div className="lg:sticky lg:top-24 rounded-[1.75rem] bg-white p-6 shadow-card border border-ink/5">
              <h2 className="font-extrabold text-lg">Order Summary</h2>
              <ul className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
                {lines.map((line) => {
                  const item = getItem(line.id);
                  return (
                    <li key={line.id} className="flex gap-3 items-center">
                      <img src={item.image} alt={item.name} className="h-14 w-14 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-bold">{item.name}</p>
                        <p className="text-xs text-ink-soft/60">{formatPKR(item.price)} each</p>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-full bg-cream px-1 py-0.5">
                        <button type="button" aria-label="Decrease" onClick={() => setQty(line.id, line.qty - 1)} className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm hover:text-ketchup">
                          <Minus size={12} />
                        </button>
                        <span className="w-5 text-center text-xs font-bold">{line.qty}</span>
                        <button type="button" aria-label="Increase" onClick={() => setQty(line.id, line.qty + 1)} className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm hover:text-ketchup">
                          <Plus size={12} />
                        </button>
                      </div>
                      <button type="button" aria-label="Remove" onClick={() => remove(line.id)} className="text-ink-soft/40 hover:text-ketchup">
                        <Trash2 size={15} />
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-5 space-y-2 border-t border-dashed border-ink/10 pt-4 text-sm">
                <div className="flex justify-between"><span className="text-ink-soft/60">Subtotal</span><b>{formatPKR(subtotal)}</b></div>
                <div className="flex justify-between">
                  <span className="text-ink-soft/60">Delivery fee</span>
                  <b className={deliveryFee === 0 ? "text-green-700" : ""}>{deliveryFee === 0 ? "FREE" : formatPKR(deliveryFee)}</b>
                </div>
                <div className="flex justify-between text-lg pt-1"><span className="font-extrabold">Total</span><span className="font-extrabold text-ketchup">{formatPKR(total)}</span></div>
              </div>
              <button
                type="submit"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-ketchup py-4 font-bold text-white shadow-pop hover:bg-ketchup-dark transition-all active:scale-[0.99]"
              >
                <BadgeCheck size={18} /> Place Order • {formatPKR(total)}
              </button>
              <p className="mt-3 text-center text-[11px] text-ink-soft/50">
                By ordering you agree to our Terms & Conditions.
              </p>
            </div>
          </Reveal>
        </form>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, MapPin, Phone, Send } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Script } from "@/components/SectionHead";

const INFO = [
  { icon: MapPin, title: "Visit Us", lines: ["14-B Main Boulevard", "Gulberg III, Lahore"] },
  { icon: Phone, title: "Call Us", lines: ["+92 300 123 4567", "042 3577 1234"] },
  { icon: Clock, title: "Opening Hours", lines: ["Mon – Sun", "11:00 AM – 11:00 PM"] },
];

const inputCls =
  "w-full rounded-2xl border border-ink/10 bg-white px-5 py-3.5 text-sm outline-none placeholder:text-ink-soft/40 focus:border-ketchup/50 focus:ring-2 focus:ring-ketchup/15 transition";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-14">
      <Reveal>
        <p className="text-[11px] font-bold tracking-[0.28em] text-ketchup uppercase text-center">Get In Touch</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight text-center">
          Say <Script>Hello!</Script>
        </h1>
        <p className="mt-3 text-center text-sm text-ink-soft/70 max-w-lg mx-auto">
          Questions, catering, feedback or just burger love — we read everything.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {INFO.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.07}>
            <div className="flex h-full items-start gap-4 rounded-[1.75rem] bg-white p-6 shadow-card border border-ink/5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ketchup/10 text-ketchup">
                <c.icon size={22} />
              </span>
              <div>
                <h3 className="font-bold">{c.title}</h3>
                {c.lines.map((l) => (
                  <p key={l} className="mt-1 text-sm text-ink-soft/70">{l}</p>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr] items-start">
        {/* map-ish panel */}
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink text-white p-8 md:p-10 min-h-[320px] flex flex-col justify-end">
            <div className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 bg-ketchup/40 paint-blob" />
            <div className="pointer-events-none absolute -left-10 bottom-10 h-32 w-32 bg-mustard/30 paint-blob-soft" />
            <div className="relative">
              <p className="font-script text-4xl text-mustard">Find the flavor</p>
              <p className="mt-3 text-sm text-white/60 max-w-sm leading-relaxed">
                Right in the heart of Gulberg with easy parking and a cozy family hall.
                Delivery available within 8 km — hot and crispy in about 30 minutes.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Dine-in", "Takeaway", "Delivery"].map((t) => (
                  <span key={t} className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* form */}
        <Reveal delay={0.08}>
          <div className="rounded-[2rem] bg-white p-7 md:p-9 shadow-card border border-ink/5">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[320px] flex-col items-center justify-center text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700"
                >
                  <CheckCircle2 size={38} />
                </motion.span>
                <h2 className="mt-5 text-2xl font-extrabold">Message sent!</h2>
                <p className="mt-2 max-w-xs text-sm text-ink-soft/70">
                  Thanks {form.name.split(" ")[0] || "friend"} — we&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-6 rounded-full bg-ink px-6 py-2.5 text-sm font-bold text-white hover:bg-ink-soft"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required placeholder="Your name" value={form.name} onChange={set("name")} className={inputCls} />
                  <input required type="email" placeholder="Email address" value={form.email} onChange={set("email")} className={inputCls} />
                </div>
                <input required placeholder="Subject" value={form.subject} onChange={set("subject")} className={inputCls} />
                <textarea
                  required
                  rows={5}
                  placeholder="Your message..."
                  value={form.message}
                  onChange={set("message")}
                  className={`${inputCls} resize-none`}
                />
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-ketchup py-4 font-bold text-white shadow-pop hover:bg-ketchup-dark transition-all active:scale-[0.99]"
                >
                  Send Message <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

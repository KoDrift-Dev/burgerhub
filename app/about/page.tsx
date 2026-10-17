"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Award, ChefHat, Clock, Heart, Leaf, Star, Truck } from "lucide-react";
import { REVIEWS, imgAbout, imgHero } from "@/lib/menu";
import Reveal from "@/components/Reveal";
import { Script } from "@/components/SectionHead";

const STATS = [
  { value: "8+", label: "Years Serving" },
  { value: "120k+", label: "Burgers Served" },
  { value: "4.9", label: "Average Rating" },
  { value: "15", label: "Dishes on Menu" },
];

const VALUES = [
  { icon: Leaf, title: "Fresh, Always", text: "Vegetables chopped daily, buns baked every morning, patties never frozen." },
  { icon: ChefHat, title: "Crafted by Experts", text: "Our chefs obsess over every layer — from the sear to the sauce." },
  { icon: Heart, title: "Made With Love", text: "Fast food with a warm heart. Every order leaves with a smile." },
  { icon: Truck, title: "Hot & Fast", text: "30-minute average delivery, food arriving crispy and steaming." },
];

const TEAM = [
  { initials: "AR", name: "Ahmed Raza", role: "Head Chef", color: "#E6392B" },
  { initials: "SK", name: "Sana Khan", role: "Pastry Chef", color: "#FFB800" },
  { initials: "BM", name: "Bilal Malik", role: "Grill Master", color: "#2F9E44" },
];

export default function AboutPage() {
  return (
    <div>
      {/* hero strip */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 bg-ketchup/30 paint-blob" />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-44 w-44 bg-mustard/25 paint-blob-soft" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24 text-center">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[0.28em] text-mustard uppercase">Our Story</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-extrabold tracking-tight">
              More Than <span className="font-script font-bold text-mustard">Just Burgers</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-white/60 text-[15px]">
              Since 2018, BurgerHub has been on one delicious mission: prove that fast food can be
              fresh, joyful and made with love.
            </p>
          </Reveal>
        </div>
      </section>

      {/* story */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <img src={imgHero} alt="Signature burger" className="rounded-[2rem] shadow-card aspect-[4/3] w-full object-cover" />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -right-2 md:right-8 rounded-3xl bg-mustard px-6 py-4 shadow-card rotate-3"
              >
                <p className="font-script text-3xl text-ink leading-none">Since 2018</p>
                <p className="text-xs font-bold text-ink/70 mt-1">Flipping with love</p>
              </motion.div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                It Started With a <Script>Grill</Script> & a Dream
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-soft/75">
                <p>
                  BurgerHub began as a tiny grill cart with three burgers on the menu and one big
                  belief: nobody should have to choose between fast and fresh.
                </p>
                <p>
                  Eight years later, we serve thousands of happy foodies every week — but every
                  burger is still smashed to order, every fry still cut fresh, and every shake still
                  blended thick.
                </p>
                <p>
                  Good food, great mood isn&apos;t just our tagline. It&apos;s the promise taped to
                  our kitchen wall.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/menu"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-ketchup px-7 py-3 text-sm font-bold text-white shadow-pop hover:bg-ketchup-dark transition-all active:scale-95"
              >
                Taste the Story <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 py-12 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-extrabold text-mustard">{s.value}</p>
                <p className="mt-1.5 text-sm text-white/60 font-medium">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* values */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 md:py-20">
        <Reveal>
          <p className="text-[11px] font-bold tracking-[0.28em] text-ketchup uppercase text-center">What We Stand For</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-center">
            Our <Script>Promise</Script> to You
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.07}>
              <div className="group h-full rounded-[1.75rem] bg-white p-6 shadow-card border border-ink/5 transition-transform hover:-translate-y-1.5">
                <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-mustard/25 text-ketchup p-3.5 transition-transform group-hover:animate-wiggle">
                  <v.icon size={24} />
                </span>
                <h3 className="mt-4 font-bold text-lg">{v.title}</h3>
                <p className="mt-1.5 text-sm text-ink-soft/70 leading-relaxed">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* team strip */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16 md:pb-24">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center">
            Meet the <Script>Flavor Makers</Script>
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-3 max-w-3xl mx-auto">
          {TEAM.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className="rounded-[1.75rem] bg-white p-6 text-center shadow-card border border-ink/5">
                <span
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-xl font-extrabold text-white"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </span>
                <p className="mt-3 font-bold">{t.name}</p>
                <p className="text-xs text-ink-soft/60">{t.role}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* reviews */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-[1.75rem] bg-white p-6 shadow-card border border-ink/5">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={14} className="fill-mustard text-mustard" />
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-sm text-ink-soft/80">&ldquo;{r.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-extrabold text-white" style={{ background: r.color }}>
                    {r.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{r.name}</span>
                    <span className="block text-xs text-ink-soft/60">{r.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-mustard/20 px-5 py-2.5 text-sm font-bold">
            <Award size={16} className="text-ketchup" />
            Voted &ldquo;Best Burger Joint&rdquo; by our customers, three years running
          </div>
          <p className="mt-3 flex items-center justify-center gap-2 text-xs text-ink-soft/50">
            <Clock size={13} /> Open daily 11:00 AM – 11:00 PM
          </p>
        </Reveal>
      </section>
    </div>
  );
}

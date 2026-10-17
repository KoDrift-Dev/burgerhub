"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, ChefHat, Heart, Leaf, Play, Star,
} from "lucide-react";
import { CATEGORIES, MENU_ITEMS, REVIEWS, SIGNATURE_IDS, imgAbout, imgHero } from "@/lib/menu";
import MenuCard from "@/components/MenuCard";
import CategoryIcon from "@/components/CategoryIcon";
import Reveal from "@/components/Reveal";
import SectionHead, { Script } from "@/components/SectionHead";

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* yellow corner blobs */}
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 bg-mustard paint-blob-soft opacity-90" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 bg-mustard/70 paint-blob opacity-60" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 pb-14 pt-10 lg:grid-cols-2 lg:items-center lg:pt-14">
        <div>
          <Reveal>
            <p className="font-script text-2xl md:text-3xl text-ink-soft italic">
              Fresh <span className="text-ketchup not-italic">•</span> Juicy{" "}
              <span className="text-ketchup not-italic">•</span> Delicious
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[1.04] tracking-tight">
              Burgers That
              <br />
              Make You <span className="font-script font-bold text-ketchup">Smile</span>
              <span className="font-script text-ketchup">{" :)"}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft/75">
              Premium ingredients. Freshly made. Because every bite should be a happy one.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link
                href="/menu"
                className="group inline-flex items-center gap-2 rounded-full bg-ketchup px-8 py-3.5 font-bold text-white shadow-pop transition-all hover:bg-ketchup-dark hover:shadow-lg active:scale-95"
              >
                Order Now
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/about" className="group inline-flex items-center gap-3 font-semibold text-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white transition-transform group-hover:scale-110">
                  <Play size={17} className="fill-white" />
                </span>
                Watch Our Story
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative">
          <div className="relative mx-auto max-w-[560px]">
            <div className="absolute inset-0 translate-x-6 translate-y-4 bg-ink paint-blob" aria-hidden="true" />
            <div className="paint-blob relative overflow-hidden border-[6px] border-ink/90">
              <img src={imgHero} alt="Juicy double cheeseburger" className="aspect-[4/3.4] w-full object-cover" />
            </div>

            {/* floating rating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 260, damping: 18 }}
              className="absolute -left-3 top-8 md:left-2 rounded-2xl bg-white/95 px-4 py-3 shadow-card backdrop-blur"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className="fill-mustard text-mustard" />
                ))}
              </div>
              <p className="mt-1 text-xs font-bold">4.9 Rating</p>
              <p className="text-[10px] text-ink-soft/60">12k+ happy foodies</p>
            </motion.div>

            {/* handwritten note */}
            <motion.p
              initial={{ opacity: 0, rotate: 8 }}
              animate={{ opacity: 1, rotate: 6 }}
              transition={{ delay: 0.9 }}
              className="absolute -right-2 top-2 md:right-4 font-script text-xl md:text-2xl text-ink text-right leading-tight"
            >
              Real Ingredients
              <br />
              Better Burgers
            </motion.p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <SectionHead
        eyebrow="Our Menu"
        title={<>Explore Our <Script>Categories</Script></>}
        sub="From classic favorites to bold new flavors, find your perfect burger."
        action={
          <Link href="/menu" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-ketchup hover:gap-2.5 transition-all shrink-0">
            View All <ArrowRight size={16} />
          </Link>
        }
      />
      <div className="mt-8 grid grid-cols-4 sm:grid-cols-7 gap-3 md:gap-4">
        {CATEGORIES.map((c, i) => {
          const highlighted = c.name === "Burgers";
          return (
            <Reveal key={c.name} delay={i * 0.05}>
              <Link
                href={`/menu?cat=${encodeURIComponent(c.name)}`}
                className={`group flex flex-col items-center gap-2.5 rounded-3xl px-2 py-6 transition-all hover:-translate-y-1.5 ${
                  highlighted
                    ? "bg-mustard shadow-card"
                    : "bg-white shadow-card border border-ink/5 hover:shadow-lg"
                }`}
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-full transition-transform group-hover:animate-wiggle ${
                    highlighted ? "bg-white/70 text-ketchup" : "bg-cream-dark/60 text-ketchup"
                  }`}
                >
                  <CategoryIcon name={c.icon} size={26} />
                </span>
                <span className="text-[13px] font-bold">{c.name}</span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Signature() {
  const items = SIGNATURE_IDS.map((id) => MENU_ITEMS.find((m) => m.id === id)!).filter(Boolean);
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <SectionHead
        eyebrow="Popular Choices"
        title={<>Our <Script>Signature Burgers</Script></>}
        sub="Handcrafted with love, served with happiness."
        action={
          <Link href="/menu" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-ketchup hover:gap-2.5 transition-all shrink-0">
            View All <ArrowRight size={16} />
          </Link>
        }
      />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {items.map((item, i) => (
          <MenuCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

function About() {
  const features = [
    { icon: Leaf, title: "Fresh Ingredients", sub: "You can trust" },
    { icon: ChefHat, title: "Expert Chefs", sub: "& Great Taste" },
    { icon: Heart, title: "Food Made", sub: "With Love" },
  ];
  return (
    <section className="relative overflow-hidden py-14">
      <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 bg-mustard/25 paint-blob-soft" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative overflow-hidden rounded-[2rem] shadow-card">
            <img src={imgAbout} alt="Burger with cola and fries" className="aspect-[4/3] w-full object-cover" />
            <p className="absolute left-6 top-6 -rotate-6 font-script text-3xl text-white drop-shadow-lg leading-tight">
              Good Food
              <br />
              Good Mood
            </p>
          </div>
          <div className="absolute -bottom-5 -left-3 h-24 w-24 bg-ketchup paint-blob opacity-90" aria-hidden="true" />
        </Reveal>

        <div>
          <Reveal>
            <p className="text-[11px] font-bold tracking-[0.28em] text-ketchup uppercase">About BurgerHub</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
              More Than <Script>Just Burgers</Script>
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft/75">
              At BurgerHub, we believe great food brings people together. Our burgers are made from
              100% fresh ingredients, crafted with passion and served with a smile. We&apos;re not
              just a restaurant, we&apos;re a place for good vibes, great food and happy moments.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-7 grid grid-cols-3 gap-4 max-w-lg">
              {features.map((f) => (
                <div key={f.title} className="text-center sm:text-left">
                  <span className="mx-auto sm:mx-0 flex h-12 w-12 items-center justify-center rounded-full bg-mustard/25 text-ketchup">
                    <f.icon size={22} />
                  </span>
                  <p className="mt-2.5 text-[13px] font-bold leading-tight">{f.title}<br />{f.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-mustard px-7 py-3 text-sm font-bold text-ink shadow-card transition-all hover:bg-mustard-soft hover:shadow-lg active:scale-95"
            >
              Our Story <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <SectionHead
        eyebrow="Customer Reviews"
        title={<>What Our <Script>Customers Say</Script></>}
        action={
          <Link href="/about" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-ketchup hover:gap-2.5 transition-all shrink-0">
            View All Reviews <ArrowRight size={16} />
          </Link>
        }
      />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.08}>
            <figure className="flex h-full flex-col rounded-[1.75rem] bg-white p-6 shadow-card border border-ink/5 transition-transform hover:-translate-y-1.5">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} className="fill-mustard text-mustard" />
                ))}
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft/80">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-extrabold text-white"
                  style={{ background: r.color }}
                >
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
    </section>
  );
}

function Promo() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-ink text-white">
          <div className="grid items-center gap-6 p-8 md:grid-cols-[1.2fr_1fr] md:p-12">
            <div>
              <p className="text-[11px] font-bold tracking-[0.28em] text-mustard uppercase">Special Offer</p>
              <h2 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                Get <span className="text-mustard">20% OFF</span>
                <br />
                on Your First Order
              </h2>
              <div className="mt-6 flex items-center gap-4">
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 rounded-full bg-mustard px-7 py-3 text-sm font-bold text-ink transition-all hover:bg-mustard-soft active:scale-95"
                >
                  Order Now <ArrowRight size={16} />
                </Link>
                <span className="text-xs text-white/50">at checkout.</span>
              </div>
            </div>
            <div className="relative">
              <img
                src={imgHero}
                alt="Burger and fries deal"
                className="mx-auto aspect-[4/3] w-full max-w-sm rounded-[1.5rem] object-cover"
              />
              <p className="absolute -top-2 right-2 rotate-6 font-script text-3xl text-mustard">
                Tasty
                <br />
                Deals!
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <Signature />
      <About />
      <Reviews />
      <Promo />
    </>
  );
}

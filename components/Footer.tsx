"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

const SOCIALS: { label: string; path: string }[] = [
  { label: "Facebook", path: "M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V11H8v3h2v7h3v-7h2.5l.5-3h-3V9.7c0-.4.3-.7.5-.7z" },
  { label: "Instagram", path: "M12 8.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8zm0-2.1a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6zm6.8-.3a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0zM12 4.2c-2.5 0-2.8 0-3.8.1a5 5 0 0 0-1.7.3 3.4 3.4 0 0 0-2 2 5 5 0 0 0-.3 1.7c-.1 1-.1 1.3-.1 3.8s0 2.8.1 3.8a5 5 0 0 0 .3 1.7 3.4 3.4 0 0 0 2 2 5 5 0 0 0 1.7.3c1 .1 1.3.1 3.8.1s2.8 0 3.8-.1a5 5 0 0 0 1.7-.3 3.4 3.4 0 0 0 2-2 5 5 0 0 0 .3-1.7c.1-1 .1-1.3.1-3.8s0-2.8-.1-3.8a5 5 0 0 0-.3-1.7 3.4 3.4 0 0 0-2-2 5 5 0 0 0-1.7-.3c-1-.1-1.3-.1-3.8-.1z" },
  { label: "X", path: "M17.8 5h2.7l-6 6.8L21.5 19h-5.6l-4.3-5.6L6.6 19H3.9l6.4-7.3L3.6 5H9l3.9 5.1L17.8 5zm-1 12.7h1.5L8.1 6.4H6.5l10.3 11.3z" },
  { label: "YouTube", path: "M21.6 8.2a2.5 2.5 0 0 0-1.8-1.8C18.2 6 12 6 12 6s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 8.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 3.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-3.8zM10 15V9l5.2 3L10 15z" },
];

const QUICK = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About Us" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const CARE = ["FAQ", "Shipping & Delivery", "Returns & Refunds", "Track Order", "Support"];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-ink text-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.4fr]">
          <div>
            <div className="[&_span]:!text-white">
              <Logo compact />
            </div>
            <p className="mt-4 text-sm text-white/50 max-w-xs">
              Good food, great mood. Serving happiness one burger at a time since 2018.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  onClick={(e) => e.preventDefault()}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-ketchup transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {QUICK.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-mustard transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-sm">
              {CARE.map((c) => (
                <li key={c}>
                  <Link href="/contact" className="hover:text-mustard transition-colors">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Subscribe to Our Newsletter</h4>
            <p className="text-sm text-white/50 mb-4">
              Get the latest offers, new menu items and more straight to your inbox.
            </p>
            {subscribed ? (
              <p className="rounded-2xl bg-mustard/15 border border-mustard/40 px-4 py-3 text-sm text-mustard font-semibold">
                You are on the list! Tasty deals coming your way.
              </p>
            ) : (
              <form onSubmit={subscribe} className="flex rounded-full bg-white p-1.5 pl-5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/40"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-mustard px-6 py-2.5 text-sm font-bold text-ink hover:bg-mustard-soft transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40">
          <p>© 2025 BurgerHub. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/contact" className="hover:text-mustard">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-mustard">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

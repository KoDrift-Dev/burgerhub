import Link from "next/link";

export function BurgerMark({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <ellipse cx="24" cy="10" rx="16" ry="7" fill="#FFB800" />
      <circle cx="17" cy="8" r="1.4" fill="#fff8ee" />
      <circle cx="24" cy="6.5" r="1.4" fill="#fff8ee" />
      <circle cx="31" cy="8" r="1.4" fill="#fff8ee" />
      <path d="M8 17c2-2 4 1 6-1s4 1 6-1 4 1 6-1 4 1 6-1 3 0 4 1v3H8v-3z" fill="#7CB342" />
      <rect x="8" y="21" width="32" height="5" rx="2.5" fill="#E6392B" />
      <rect x="8" y="27" width="32" height="4" rx="2" fill="#FFB800" />
      <rect x="10" y="32" width="28" height="6" rx="3" fill="#8D5A2B" />
      <ellipse cx="24" cy="40" rx="15" ry="4.5" fill="#E8A94E" />
    </svg>
  );
}

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="BurgerHub home">
      <BurgerMark size={compact ? 38 : 44} />
      <span className="leading-none">
        <span className="block font-extrabold text-xl tracking-tight">
          Burger<span className="text-ketchup">Hub</span>
        </span>
        {!compact && (
          <span className="block text-[10px] font-medium text-ink-soft/70 tracking-wide">
            Good Food • Great Mood
          </span>
        )}
      </span>
    </Link>
  );
}

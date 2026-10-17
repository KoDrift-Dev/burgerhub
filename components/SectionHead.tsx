import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeadProps {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  align?: "left" | "center";
  action?: ReactNode;
}

export default function SectionHead({ eyebrow, title, sub, align = "left", action }: SectionHeadProps) {
  return (
    <Reveal>
      <div className={align === "center" ? "text-center" : "flex items-end justify-between gap-6"}>
        <div className={align === "center" ? "mx-auto max-w-xl" : "max-w-xl"}>
          <p className="text-[11px] font-bold tracking-[0.28em] text-ketchup uppercase">{eyebrow}</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h2>
          {sub && <p className="mt-2 text-sm text-ink-soft/80">{sub}</p>}
        </div>
        {action}
      </div>
    </Reveal>
  );
}

/** Red Caveat script accent used inside headings, e.g. <Script>Categories</Script> */
export function Script({ children }: { children: ReactNode }) {
  return <span className="font-script font-semibold text-ketchup">{children}</span>;
}

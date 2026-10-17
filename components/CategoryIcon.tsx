import { CupSoda, Dessert, Drumstick, Hamburger, Popcorn, Sandwich } from "lucide-react";

function FriesSvg({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 10v9.5a1.5 1.5 0 0 0 1.5 1.5h7a1.5 1.5 0 0 0 1.5-1.5V10" />
      <path d="M5.5 10h13l-1 9.5H6.5l-1-9.5z" fill="currentColor" opacity={0.12} stroke="none" />
      <path d="M5.5 10h13" />
      <path d="M9 10V4.5M12 10V3M15 10V4.5M10.5 10V6M13.5 10V6" />
    </svg>
  );
}

const MAP: Record<string, (props: { size?: number }) => React.ReactNode> = {
  Hamburger: ({ size }) => <Hamburger size={size} strokeWidth={1.8} />,
  Drumstick: ({ size }) => <Drumstick size={size} strokeWidth={1.8} />,
  FriesCustom: ({ size }) => <FriesSvg size={size} />,
  Sandwich: ({ size }) => <Sandwich size={size} strokeWidth={1.8} />,
  Popcorn: ({ size }) => <Popcorn size={size} strokeWidth={1.8} />,
  CupSoda: ({ size }) => <CupSoda size={size} strokeWidth={1.8} />,
  Dessert: ({ size }) => <Dessert size={size} strokeWidth={1.8} />,
};

export default function CategoryIcon({ name, size = 26 }: { name: string; size?: number }) {
  const Cmp = MAP[name] ?? MAP.Hamburger;
  return <>{Cmp({ size })}</>;
}

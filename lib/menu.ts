import {
  imgBurgerClassic, imgBurgerZinger, imgBurgerBacon, imgBurgerMushroom,
  imgBurgerSmash, imgFries, imgFriesLoaded, imgWings, imgWrap, imgOnionRings,
  imgShake, imgLava, imgStrips, imgMint, imgHero, imgAbout,
} from "./images";

export type Category =
  | "Burgers" | "Chicken" | "Fries" | "Wraps" | "Sides" | "Drinks" | "Desserts";

export type Badge = "Best Seller" | "Spicy" | "Popular" | "New";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // PKR
  category: Category;
  image: string;
  badge?: Badge;
  rating: number;
  reviews: number;
}

export const CATEGORIES: { name: Category; icon: string; blurb: string }[] = [
  { name: "Burgers", icon: "Hamburger", blurb: "Stacked & juicy" },
  { name: "Chicken", icon: "Drumstick", blurb: "Crispy & grilled" },
  { name: "Fries", icon: "FriesCustom", blurb: "Golden & salty" },
  { name: "Wraps", icon: "Sandwich", blurb: "Rolled with love" },
  { name: "Sides", icon: "Popcorn", blurb: "Perfect partners" },
  { name: "Drinks", icon: "CupSoda", blurb: "Ice-cold sips" },
  { name: "Desserts", icon: "Dessert", blurb: "Sweet endings" },
];

export const MENU_ITEMS: MenuItem[] = [
  // ---- BURGERS ----
  { id: "classic-beef-burger", name: "Classic Beef Burger", description: "Juicy beef patty, fresh lettuce, tomato, cheese and our special sauce.", price: 749, category: "Burgers", image: imgBurgerClassic, badge: "Best Seller", rating: 4.9, reviews: 2314 },
  { id: "spicy-chicken-burger", name: "Spicy Chicken Burger", description: "Crispy chicken, lettuce, tomato and fiery spicy sauce.", price: 649, category: "Burgers", image: imgBurgerZinger, badge: "Spicy", rating: 4.7, reviews: 1876 },
  { id: "bbq-bacon-burger", name: "BBQ Bacon Burger", description: "Beef patty, crispy bacon, cheddar cheese and smoky BBQ sauce.", price: 849, category: "Burgers", image: imgBurgerBacon, badge: "Popular", rating: 4.8, reviews: 1542 },
  { id: "mushroom-swiss-burger", name: "Mushroom Swiss Burger", description: "Beef patty, sautéed mushrooms, melted swiss cheese, special sauce.", price: 799, category: "Burgers", image: imgBurgerMushroom, badge: "New", rating: 4.6, reviews: 489 },
  { id: "spicy-zinger-burger", name: "Spicy Zinger Burger", description: "Crispy zinger fillet, spicy mayo, lettuce and crunchy pickles.", price: 699, category: "Burgers", image: imgBurgerZinger, badge: "Spicy", rating: 4.7, reviews: 1204 },
  { id: "double-smash-burger", name: "Double Smash Burger", description: "Two smashed patties with lacy edges, double cheese and house sauce.", price: 899, category: "Burgers", image: imgBurgerSmash, rating: 4.9, reviews: 967 },
  // ---- CHICKEN ----
  { id: "crispy-chicken-strips", name: "Crispy Chicken Strips", description: "Five golden breaded tenders with our creamy signature dip.", price: 549, category: "Chicken", image: imgStrips, badge: "Popular", rating: 4.6, reviews: 834 },
  { id: "buffalo-hot-wings", name: "Buffalo Hot Wings (8 pc)", description: "Tossed in glossy buffalo glaze, served with cool ranch dip.", price: 649, category: "Chicken", image: imgWings, badge: "Spicy", rating: 4.7, reviews: 712 },
  { id: "grilled-chicken-platter", name: "Grilled Chicken Platter", description: "Char-grilled chicken with herbs, served with fries and garlic sauce.", price: 899, category: "Chicken", image: imgWings, rating: 4.5, reviews: 356 },
  { id: "chicken-nuggets", name: "Chicken Nuggets (9 pc)", description: "Bite-sized, extra crispy nuggets with two dips of your choice.", price: 449, category: "Chicken", image: imgStrips, rating: 4.5, reviews: 921 },
  // ---- FRIES ----
  { id: "classic-fries", name: "Classic Fries", description: "Golden, crispy and salted just right. The one and only.", price: 349, category: "Fries", image: imgFries, rating: 4.6, reviews: 1870 },
  { id: "loaded-cheese-fries", name: "Loaded Cheese Fries", description: "Fries drowned in cheddar sauce, jalapeños and crispy chicken bits.", price: 549, category: "Fries", image: imgFriesLoaded, badge: "Best Seller", rating: 4.8, reviews: 1345 },
  { id: "curly-fries", name: "Curly Fries", description: "Seasoned spiral fries with a peppery kick and garlic mayo.", price: 399, category: "Fries", image: imgFries, rating: 4.4, reviews: 523 },
  // ---- WRAPS ----
  { id: "chicken-tikka-wrap", name: "Chicken Tikka Wrap", description: "Smoky tikka chunks, mint chutney and onions in a soft tortilla.", price: 599, category: "Wraps", image: imgWrap, rating: 4.6, reviews: 689 },
  { id: "crispy-chicken-wrap", name: "Crispy Chicken Wrap", description: "Crunchy chicken strips, lettuce and pepper mayo, rolled tight.", price: 649, category: "Wraps", image: imgWrap, badge: "Popular", rating: 4.7, reviews: 542 },
  { id: "beef-smash-wrap", name: "Beef Smash Wrap", description: "Smashed beef, cheddar and pickles wrapped with house sauce.", price: 749, category: "Wraps", image: imgWrap, badge: "New", rating: 4.5, reviews: 198 },
  // ---- SIDES ----
  { id: "mozzarella-sticks", name: "Mozzarella Sticks (6 pc)", description: "Gooey cheese sticks in a crunchy golden coating, marinara dip.", price: 499, category: "Sides", image: imgOnionRings, rating: 4.6, reviews: 445 },
  { id: "crispy-onion-rings", name: "Crispy Onion Rings", description: "Beer-battered onion rings, fried to a perfect crunch.", price: 399, category: "Sides", image: imgOnionRings, rating: 4.5, reviews: 612 },
  { id: "chicken-pops", name: "Chicken Pops", description: "Popcorn-style crispy chicken bites with spicy mayo drizzle.", price: 449, category: "Sides", image: imgStrips, badge: "New", rating: 4.4, reviews: 287 },
  // ---- DRINKS ----
  { id: "chocolate-malt-shake", name: "Chocolate Malt Shake", description: "Thick chocolate shake crowned with whipped cream and drizzle.", price: 449, category: "Drinks", image: imgShake, badge: "Best Seller", rating: 4.9, reviews: 1567 },
  { id: "mint-margarita", name: "Mint Margarita", description: "Crushed ice, fresh mint and lime. The ultimate cooler.", price: 349, category: "Drinks", image: imgMint, rating: 4.5, reviews: 834 },
  { id: "oreo-crunch-shake", name: "Oreo Crunch Shake", description: "Cookies-and-cream shake with crushed Oreo topping.", price: 499, category: "Drinks", image: imgShake, rating: 4.7, reviews: 698 },
  // ---- DESSERTS ----
  { id: "molten-lava-cake", name: "Molten Lava Cake", description: "Warm chocolate cake with a gooey molten center and cocoa dust.", price: 549, category: "Desserts", image: imgLava, badge: "Popular", rating: 4.8, reviews: 923 },
  { id: "churros-chocolate", name: "Churros with Chocolate", description: "Cinnamon-dusted churros with a rich chocolate dipping sauce.", price: 449, category: "Desserts", image: imgLava, badge: "New", rating: 4.6, reviews: 312 },
];

export const SIGNATURE_IDS = [
  "classic-beef-burger",
  "spicy-chicken-burger",
  "bbq-bacon-burger",
  "mushroom-swiss-burger",
  "spicy-zinger-burger",
];

export function getItem(id: string): MenuItem {
  const item = MENU_ITEMS.find((m) => m.id === id);
  if (!item) throw new Error(`Unknown menu item: ${id}`);
  return item;
}

export function formatPKR(n: number): string {
  return "Rs " + n.toLocaleString("en-PK");
}

export interface Review {
  name: string;
  role: string;
  quote: string;
  initials: string;
  color: string;
}

export const REVIEWS: Review[] = [
  { name: "Nusrat Jahan", role: "Regular Customer", quote: "The burgers here are simply amazing! Fresh, tasty and always consistent. My new favorite spot!", initials: "NJ", color: "#E6392B" },
  { name: "Fahim Rahman", role: "Food Lover", quote: "Great food, fast service and a cozy atmosphere. The BBQ Bacon Burger is a must-try!", initials: "FR", color: "#FFB800" },
  { name: "Tasmia Islam", role: "Happy Customer", quote: "Absolutely love the quality and taste. BurgerHub never disappoints! Highly recommended!", initials: "TI", color: "#2F9E44" },
];

export const GALLERY_SHOTS: { src: string; label: string; tall?: boolean }[] = [
  { src: imgHero, label: "The Double Trouble", tall: true },
  { src: imgBurgerClassic, label: "Classic Beef" },
  { src: imgFriesLoaded, label: "Loaded Fries", tall: true },
  { src: imgShake, label: "Choco Malt Shake" },
  { src: imgBurgerSmash, label: "Double Smash", tall: true },
  { src: imgWings, label: "Buffalo Wings" },
  { src: imgAbout, label: "The Full Spread", tall: true },
  { src: imgLava, label: "Molten Lava Cake" },
  { src: imgWrap, label: "Tikka Wrap" },
  { src: imgBurgerBacon, label: "BBQ Bacon", tall: true },
];

export { imgHero, imgAbout };
export const FREE_DELIVERY_THRESHOLD = 1500;
export const DELIVERY_FEE = 150;

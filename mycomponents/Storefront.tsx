"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CATEGORIES = [
  "ALL",
  "FLOWER",
  "PREROLL",
  "CARTRIDGE",
  "EXTRACT",
  "EDIBLE",
  "BEVERAGE",
  "TINCTURE",
  "TOPICAL",
  "PILL",
  "MERCH",
] as const;

const TYPES = ["ALL", "HYBRID", "INDICA", "SATIVA", "CBD"] as const;

const LOCATIONS = [
  {
    key: "MODESTO",
    address: "4725 Yosemite Blvd, Modesto, CA 95357",
    hours: "OPEN: 8:00 AM - 10:00 PM",
  },
  {
    key: "OAKDALE",
    address: "633 Armstrong Way, Oakdale, CA 95361",
    hours: "OPEN: 8:00 AM - 10:00 PM",
  },
  {
    key: "PATTERSON",
    address: "520 Park Center Dr, Patterson, CA 95363",
    hours: "OPEN: 8:00 AM - 10:00 PM",
  },
] as const;

type Category = (typeof CATEGORIES)[number];
type TypeTag = (typeof TYPES)[number];
type LocationKey = (typeof LOCATIONS)[number]["key"];

type Product = {
  id: string;
  location: LocationKey;
  category: Exclude<Category, "ALL">;
  type: Exclude<TypeTag, "ALL">;
  name: string;
  brand: string;
  strain: string;
  thc: number;
  cbd: number;
  grams: string;
  price: number;
  image: string;
};

const PRODUCTS: Product[] = [
  {
    id: "m1",
    location: "MODESTO",
    category: "FLOWER",
    type: "HYBRID",
    name: "SUNSMOKE - PRE GROUND - 28G",
    brand: "Sunsmoke",
    strain: "Pre Ground",
    thc: 24.75,
    cbd: 0.21,
    grams: "28.0 grams",
    price: 36,
    image: "/mycomponents/ezgif-frame-014.jpg",
  },
  {
    id: "m2",
    location: "MODESTO",
    category: "FLOWER",
    type: "INDICA",
    name: "WAVE RIDER - SMALLS - 28G",
    brand: "Wave Rider",
    strain: "Gelato 33",
    thc: 22.15,
    cbd: 0.06,
    grams: "28.0 grams",
    price: 70,
    image: "/mycomponents/ezgif-frame-020.jpg",
  },
  {
    id: "m3",
    location: "MODESTO",
    category: "FLOWER",
    type: "CBD",
    name: "PURE BEAUTY - 1:1 - 3.5G",
    brand: "Pure Beauty",
    strain: "Gush Mints",
    thc: 13.87,
    cbd: 14.39,
    grams: "3.5 grams",
    price: 35,
    image: "/mycomponents/ezgif-frame-017.jpg",
  },
  {
    id: "m4",
    location: "MODESTO",
    category: "PREROLL",
    type: "SATIVA",
    name: "CITRUS TWIST - 2 PACK",
    brand: "Dovetail",
    strain: "Strawberry Guava",
    thc: 23.37,
    cbd: 0.22,
    grams: "2 x 0.75g",
    price: 14,
    image: "/mycomponents/ezgif-frame-022.jpg",
  },
  {
    id: "m5",
    location: "MODESTO",
    category: "CARTRIDGE",
    type: "HYBRID",
    name: "MANGO LIVE RESIN CART",
    brand: "Coastal Sun",
    strain: "Mango Haze",
    thc: 87.2,
    cbd: 0.18,
    grams: "1.0g",
    price: 38,
    image: "/mycomponents/ezgif-frame-031.jpg",
  },
  {
    id: "m6",
    location: "MODESTO",
    category: "EXTRACT",
    type: "INDICA",
    name: "COLD CURE ROSIN",
    brand: "Valley Press",
    strain: "Ice Cream Cake",
    thc: 81.1,
    cbd: 0.09,
    grams: "1.0g",
    price: 42,
    image: "/mycomponents/ezgif-frame-041.jpg",
  },
  {
    id: "m7",
    location: "MODESTO",
    category: "EDIBLE",
    type: "HYBRID",
    name: "BLUEBERRY GUMMIES",
    brand: "Cali Bites",
    strain: "Blueberry",
    thc: 10,
    cbd: 0,
    grams: "100mg pack",
    price: 18,
    image: "/mycomponents/ezgif-frame-050.jpg",
  },
  {
    id: "m8",
    location: "MODESTO",
    category: "BEVERAGE",
    type: "SATIVA",
    name: "SPARKLING LIME THC",
    brand: "Sip",
    strain: "Lime",
    thc: 10,
    cbd: 0,
    grams: "12oz can",
    price: 9,
    image: "/mycomponents/ezgif-frame-059.jpg",
  },
  {
    id: "m9",
    location: "MODESTO",
    category: "TINCTURE",
    type: "CBD",
    name: "MINT RELIEF DROPS",
    brand: "Remedy",
    strain: "Mint",
    thc: 4,
    cbd: 30,
    grams: "30ml bottle",
    price: 30,
    image: "/mycomponents/ezgif-frame-066.jpg",
  },
  {
    id: "m10",
    location: "MODESTO",
    category: "TOPICAL",
    type: "CBD",
    name: "RESTORE BALM",
    brand: "Relief Lab",
    strain: "Unscented",
    thc: 2,
    cbd: 25,
    grams: "2oz tin",
    price: 26,
    image: "/mycomponents/ezgif-frame-071.jpg",
  },
  {
    id: "m11",
    location: "MODESTO",
    category: "PILL",
    type: "HYBRID",
    name: "NIGHTTIME SOFTGELS",
    brand: "Calm Dose",
    strain: "Balanced",
    thc: 5,
    cbd: 2,
    grams: "20 count",
    price: 24,
    image: "/mycomponents/ezgif-frame-074.jpg",
  },
  {
    id: "m12",
    location: "MODESTO",
    category: "MERCH",
    type: "HYBRID",
    name: "CALI EVERYDAY CAP",
    brand: "Cali Kosher",
    strain: "Accessory",
    thc: 0,
    cbd: 0,
    grams: "One size",
    price: 28,
    image: "/modesto.webp",
  },

  {
    id: "o1",
    location: "OAKDALE",
    category: "FLOWER",
    type: "SATIVA",
    name: "CHEM KARDASHIAN - 14G",
    brand: "Coastal Sun",
    strain: "Chem Kardashian",
    thc: 24.3,
    cbd: 0.04,
    grams: "14.0 grams",
    price: 48,
    image: "/mycomponents/ezgif-frame-017.jpg",
  },
  {
    id: "o2",
    location: "OAKDALE",
    category: "PREROLL",
    type: "HYBRID",
    name: "HOUSE PRE ROLL",
    brand: "Sunsmoke",
    strain: "OG Blend",
    thc: 22.4,
    cbd: 0.09,
    grams: "1.0g",
    price: 11,
    image: "/mycomponents/ezgif-frame-026.jpg",
  },
  {
    id: "o3",
    location: "OAKDALE",
    category: "CARTRIDGE",
    type: "HYBRID",
    name: "PINEAPPLE DISTILLATE CART",
    brand: "Wave Rider",
    strain: "Pineapple",
    thc: 89.1,
    cbd: 0.11,
    grams: "1.0g",
    price: 34,
    image: "/mycomponents/ezgif-frame-035.jpg",
  },
  {
    id: "o4",
    location: "OAKDALE",
    category: "EXTRACT",
    type: "INDICA",
    name: "DIAMOND SAUCE",
    brand: "Valley Press",
    strain: "Diamond OG",
    thc: 84,
    cbd: 0.08,
    grams: "1.0g",
    price: 40,
    image: "/mycomponents/ezgif-frame-045.jpg",
  },
  {
    id: "o5",
    location: "OAKDALE",
    category: "EDIBLE",
    type: "HYBRID",
    name: "WATERMELON CHEWS",
    brand: "Cali Bites",
    strain: "Watermelon",
    thc: 10,
    cbd: 0,
    grams: "100mg pack",
    price: 17,
    image: "/mycomponents/ezgif-frame-053.jpg",
  },
  {
    id: "o6",
    location: "OAKDALE",
    category: "TOPICAL",
    type: "CBD",
    name: "RECOVERY CREAM",
    brand: "Relief Lab",
    strain: "Menthol",
    thc: 1,
    cbd: 28,
    grams: "3oz tube",
    price: 29,
    image: "/mycomponents/ezgif-frame-069.jpg",
  },
  {
    id: "o7",
    location: "OAKDALE",
    category: "MERCH",
    type: "HYBRID",
    name: "CALI ZIP HOODIE",
    brand: "Cali Kosher",
    strain: "Apparel",
    thc: 0,
    cbd: 0,
    grams: "Unisex",
    price: 55,
    image: "/oakdale.webp",
  },

  {
    id: "p1",
    location: "PATTERSON",
    category: "FLOWER",
    type: "HYBRID",
    name: "SUNSMOKE - PRE GROUND - 14G",
    brand: "Sunsmoke",
    strain: "Pre Ground",
    thc: 21.69,
    cbd: 0.2,
    grams: "14.0 grams",
    price: 24,
    image: "/mycomponents/ezgif-frame-020.jpg",
  },
  {
    id: "p2",
    location: "PATTERSON",
    category: "PREROLL",
    type: "SATIVA",
    name: "STRAWBERRY GUAVA - 1G",
    brand: "Dovetail",
    strain: "Strawberry Guava",
    thc: 23.37,
    cbd: 0.22,
    grams: "1.0g",
    price: 10,
    image: "/mycomponents/ezgif-frame-028.jpg",
  },
  {
    id: "p3",
    location: "PATTERSON",
    category: "CARTRIDGE",
    type: "INDICA",
    name: "LEMON OG LIVE CART",
    brand: "Wave Rider",
    strain: "Lemon OG",
    thc: 86,
    cbd: 0.1,
    grams: "1.0g",
    price: 36,
    image: "/mycomponents/ezgif-frame-038.jpg",
  },
  {
    id: "p4",
    location: "PATTERSON",
    category: "EXTRACT",
    type: "HYBRID",
    name: "ROSIN BADDER",
    brand: "Valley Press",
    strain: "Gelato Mix",
    thc: 79,
    cbd: 0.05,
    grams: "1.0g",
    price: 44,
    image: "/mycomponents/ezgif-frame-047.jpg",
  },
  {
    id: "p5",
    location: "PATTERSON",
    category: "EDIBLE",
    type: "HYBRID",
    name: "STRAWBERRY BITES",
    brand: "Cali Bites",
    strain: "Strawberry",
    thc: 10,
    cbd: 0,
    grams: "100mg pack",
    price: 16,
    image: "/mycomponents/ezgif-frame-056.jpg",
  },
  {
    id: "p6",
    location: "PATTERSON",
    category: "BEVERAGE",
    type: "SATIVA",
    name: "BERRY SPARK SELTZER",
    brand: "Sip",
    strain: "Berry",
    thc: 10,
    cbd: 0,
    grams: "12oz can",
    price: 9,
    image: "/mycomponents/ezgif-frame-063.jpg",
  },
  {
    id: "p7",
    location: "PATTERSON",
    category: "TINCTURE",
    type: "CBD",
    name: "SLEEP SUPPORT DROPS",
    brand: "Remedy",
    strain: "Night Blend",
    thc: 5,
    cbd: 30,
    grams: "30ml bottle",
    price: 29,
    image: "/mycomponents/ezgif-frame-072.jpg",
  },
  {
    id: "p8",
    location: "PATTERSON",
    category: "PILL",
    type: "HYBRID",
    name: "BALANCED CAPSULES",
    brand: "Calm Dose",
    strain: "5:5 Blend",
    thc: 5,
    cbd: 5,
    grams: "20 count",
    price: 24,
    image: "/mycomponents/ezgif-frame-077.jpg",
  },
  {
    id: "p9",
    location: "PATTERSON",
    category: "MERCH",
    type: "HYBRID",
    name: "LOGO GRINDER",
    brand: "Cali Kosher",
    strain: "Accessory",
    thc: 0,
    cbd: 0,
    grams: "4-piece",
    price: 20,
    image: "/patterson.webp",
  },
];

type SortOption = "FEATURED" | "PRICE_LOW" | "PRICE_HIGH" | "THC_HIGH";

const SHOP_CARD_IMAGES = [
  { src: "/shoppics/2021-02-19.webp", fit: "cover" },
  { src: "/shoppics/6b66d057-e20c-412d-bcd8-6b8b0a29648e.png", fit: "contain" },
  { src: "/shoppics/996b9a5a-29c9-4fb5-a596-0764f86d4276.png", fit: "contain" },
  { src: "/shoppics/1f7a6ede-5da7-4c99-9204-1d3d9803cdc4.png", fit: "contain" },
  { src: "/shoppics/6565ba1f-4957-45bd-8b1e-8c5a53f4936d.jpeg", fit: "cover" },
  { src: "/shoppics/66b37fb9-9610-4bb8-9588-9393486ec7ae.jpeg", fit: "cover" },
  { src: "/shoppics/4bd5e713-d3d7-4dc5-8fb8-8ceb287e8d3a.jpeg", fit: "cover" },
  { src: "/shoppics/1b0bb6c8-8475-4d3e-970f-3a70dbc79e5b.png", fit: "contain" },
  { src: "/shoppics/f89ba97d-5216-4cbb-9ef1-76bdaf96ebaa.png", fit: "contain" },
  { src: "/shoppics/85c73748-5116-4e40-a7b0-1b161a3eb490.png", fit: "contain" },
  { src: "/shoppics/generic_box.jpg", fit: "cover" },
] as const;

function getShopCardImage(productId: string) {
  const hash = [...productId].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return SHOP_CARD_IMAGES[hash % SHOP_CARD_IMAGES.length];
}

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Storefront() {
  const [activeLocation, setActiveLocation] = useState<LocationKey>("MODESTO");
  const [activeCategory, setActiveCategory] = useState<Category>("ALL");
  const [activeType, setActiveType] = useState<TypeTag>("ALL");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("FEATURED");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutPhone, setCheckoutPhone] = useState("");
  const [checkoutNote, setCheckoutNote] = useState("");

  const [cartItems, setCartItems] = useState<
    Array<{
      id: string;
      name: string;
      grams: string;
      price: number;
      image: string;
      quantity: number;
    }>
  >([]);

  const activeLocationMeta = LOCATIONS.find((location) => location.key === activeLocation);

  const locationProducts = useMemo(() => {
    return PRODUCTS.filter((product) => product.location === activeLocation);
  }, [activeLocation]);

  const queryFilteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return locationProducts.filter((product) => {
      const matchesQuery =
        q.length === 0 ||
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.strain.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q);

      const matchesType = activeType === "ALL" || product.type === activeType;
      return matchesQuery && matchesType;
    });
  }, [locationProducts, query, activeType]);

  const sortedProducts = useMemo(() => {
    const next = [...queryFilteredProducts];
    if (sortBy === "PRICE_LOW") next.sort((a, b) => a.price - b.price);
    if (sortBy === "PRICE_HIGH") next.sort((a, b) => b.price - a.price);
    if (sortBy === "THC_HIGH") next.sort((a, b) => b.thc - a.thc);
    return next;
  }, [queryFilteredProducts, sortBy]);

  const groupedProducts = useMemo(() => {
    if (activeCategory !== "ALL") {
      return [
        {
          category: activeCategory,
          items: sortedProducts.filter((product) => product.category === activeCategory),
        },
      ];
    }

    return CATEGORIES.filter((category) => category !== "ALL")
      .map((category) => ({
        category,
        items: sortedProducts.filter((product) => product.category === category),
      }))
      .filter((group) => group.items.length > 0);
  }, [activeCategory, sortedProducts]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const cartSubtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          grams: product.grams,
          price: product.price,
          image: getShopCardImage(product.id).src,
          quantity: 1,
        },
      ];
    });
    setCartOpen(true);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const submitCheckout = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (cartItems.length === 0) return;

    setCartItems([]);
    setCheckoutOpen(false);
    setCartOpen(false);
    setCheckoutName("");
    setCheckoutEmail("");
    setCheckoutPhone("");
    setCheckoutNote("");
    window.alert("Order submitted. We will contact you shortly to confirm pickup.");
  };

  return (
    <section
      id="storefront"
      className="relative overflow-hidden bg-gradient-to-b from-[#f8f5ef] via-white to-white px-4 pb-20 pt-8 text-zinc-950 sm:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(61,79,114,0.08),transparent_28%),radial-gradient(circle_at_88%_0%,rgba(66,102,156,0.12),transparent_34%)]" />

      <div className="relative mx-auto w-full max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="sticky top-3 z-20 mb-6 flex justify-end"
        >
          <button
            type="button"
            onClick={() => setCartOpen((open) => !open)}
            className="rounded-full border border-[#d6c7ac] bg-white/90 px-5 py-2.5 text-sm font-semibold tracking-[0.12em] text-[#231f18] shadow-[0_8px_30px_rgba(44,35,24,0.14)] backdrop-blur"
          >
            CART ({cartCount}) · ${cartSubtotal.toFixed(2)}
          </button>
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[2rem] border border-[#e5dccd] bg-white/85 shadow-[0_20px_60px_rgba(42,32,21,0.08)] backdrop-blur-md"
        >
          <div className="border-b border-[#e5dccd] bg-gradient-to-r from-[#3b342a] via-[#2c261f] to-[#1f1b16] px-5 py-5 text-white sm:px-7">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-[#e2d6c1]">PICKUP LOCATION</p>
                <p className="mt-2 text-base font-medium text-white/95 sm:text-lg">{activeLocationMeta?.address}</p>
              </div>
              <p className="text-xs font-semibold tracking-[0.16em] text-[#e2d6c1] sm:text-sm">{activeLocationMeta?.hours}</p>
            </div>
          </div>

          <div className="grid gap-5 px-5 py-6 sm:px-7 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-zinc-500">SHOP CALI KOSHER</p>
                <h2 className="mt-2 text-2xl font-semibold leading-tight text-zinc-900 sm:text-3xl">
                  Premium menu, modern reserve flow.
                </h2>
              </div>
              <div>
                <label
                  htmlFor="store-search"
                  className="mb-2 block text-xs font-semibold tracking-[0.16em] text-zinc-500"
                >
                  SEARCH PRODUCTS
                </label>
                <input
                  id="store-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  type="text"
                  placeholder="Search strains, brands, categories..."
                  className="h-12 w-full rounded-xl border border-[#ded3bf] bg-white px-4 text-sm outline-none transition focus:border-[#9f8457] focus:ring-4 focus:ring-[#d9c29a]/25"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {LOCATIONS.map((location) => (
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  key={location.key}
                  type="button"
                  onClick={() => setActiveLocation(location.key)}
                  className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold tracking-[0.12em] transition ${
                    activeLocation === location.key
                      ? "border-[#1f1b16] bg-[#1f1b16] text-white shadow-[0_10px_20px_rgba(31,27,22,0.28)]"
                      : "border-[#e3d8c7] bg-white text-zinc-800 hover:border-[#9f8457] hover:text-[#231f18]"
                  }`}
                >
                  {location.key}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-6 overflow-x-auto rounded-2xl border border-[#e5dccd] bg-white/90 px-2 py-3 shadow-[0_16px_40px_rgba(43,33,21,0.06)]"
        >
          <div className="flex min-w-max items-center gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-xs font-semibold tracking-[0.14em] transition ${
                  activeCategory === category
                    ? "bg-[#1f1b16] text-white shadow-[0_8px_18px_rgba(31,27,22,0.35)]"
                    : "bg-[#f6f1e8] text-[#5c5448] hover:bg-[#efe7da] hover:text-[#231f18]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.14 }}
          className="mt-4 flex flex-col gap-4 rounded-2xl border border-[#e5dccd] bg-white/90 p-4 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex flex-wrap items-center gap-2">
            {TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setActiveType(type)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-[0.1em] transition ${
                  activeType === type
                    ? "border-[#1f1b16] bg-[#1f1b16] text-white"
                    : "border-[#ded3bf] bg-white text-zinc-700 hover:border-[#9f8457] hover:text-[#231f18]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="sort-by" className="text-xs font-semibold tracking-[0.14em] text-zinc-500">
              SORT
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
              className="h-10 rounded-xl border border-[#ded3bf] bg-white px-3 text-sm outline-none transition focus:border-[#9f8457]"
            >
              <option value="FEATURED">Featured</option>
              <option value="PRICE_LOW">Price: Low to High</option>
              <option value="PRICE_HIGH">Price: High to Low</option>
              <option value="THC_HIGH">THC: High to Low</option>
            </select>
          </div>
        </motion.div>

        <div className="mt-5">
          <p className="text-sm uppercase tracking-[0.12em] text-zinc-600">
            {sortedProducts.length} products available in {activeLocation}
          </p>
        </div>

        <div className="mt-8 space-y-12">
          {groupedProducts.map((group) => (
            <motion.section
              key={group.category}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-5 flex items-end justify-between border-b border-[#dce5f2] pb-3">
                <h3 className="text-2xl font-semibold tracking-[0.04em] text-zinc-900">{group.category}</h3>
                {activeCategory === "ALL" && (
                  <button
                    type="button"
                    onClick={() => setActiveCategory(group.category)}
                    className="text-sm font-semibold text-[#7a633f] hover:underline"
                  >
                    View all
                  </button>
                )}
              </div>

              <motion.div
                variants={listVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-120px" }}
                className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
              >
                {(activeCategory === "ALL" ? group.items.slice(0, 8) : group.items).map((product) => (
                  <motion.article
                    variants={itemVariants}
                    whileHover={{ y: -6 }}
                    key={product.id}
                    className="group overflow-hidden rounded-3xl border border-[#e5dccd] bg-white shadow-[0_14px_35px_rgba(38,30,20,0.1)] transition"
                  >
                    <div className="relative h-56 overflow-hidden bg-gradient-to-b from-[#fbf8f2] to-[#f2ebdf]">
                      {(() => {
                        const asset = getShopCardImage(product.id);
                        return (
                          <Image
                            src={asset.src}
                            alt={product.name}
                            fill
                            className={`transition duration-500 group-hover:scale-[1.04] ${
                              asset.fit === "contain" ? "object-contain p-4" : "object-cover"
                            }`}
                          />
                        );
                      })()}
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/10 to-transparent opacity-70" />
                    </div>

                    <div className="space-y-3 p-4">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="rounded-full bg-[#f3eadb] px-2.5 py-1 font-semibold tracking-[0.08em] text-[#6c5533]">
                          {product.type}
                        </span>
                        <span className="rounded-full bg-[#e8dcc7] px-2.5 py-1 font-semibold tracking-[0.08em] text-[#4e3f27]">
                          {product.category}
                        </span>
                      </div>

                      <h4 className="line-clamp-2 text-base font-semibold leading-tight">{product.name}</h4>
                      <p className="text-xs text-zinc-500">{product.brand}</p>

                      <div className="flex flex-wrap gap-2 text-xs text-zinc-600">
                        <span>THC: {product.thc}%</span>
                        <span>CBD: {product.cbd}%</span>
                        <span>{product.grams}</span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <p className="text-2xl font-semibold text-zinc-900">${product.price}</p>
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          type="button"
                          onClick={() => addToCart(product)}
                          className="rounded-xl bg-[#1f1b16] px-4 py-2 text-xs font-semibold tracking-[0.12em] text-white shadow-[0_8px_22px_rgba(31,27,22,0.35)] transition hover:bg-[#13100c]"
                        >
                          ADD TO CART
                        </motion.button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>

              {activeCategory === "ALL" && group.items.length > 8 && (
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => setActiveCategory(group.category)}
                    className="rounded-xl border border-[#ded3bf] bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-[#9f8457] hover:text-[#231f18]"
                  >
                    Explore all {group.category.toLowerCase()} products
                  </button>
                </div>
              )}
            </motion.section>
          ))}
        </div>

        {groupedProducts.length === 0 && (
          <div className="mt-10 rounded-2xl border border-[#e5dccd] bg-white px-6 py-10 text-center text-sm uppercase tracking-[0.08em] text-zinc-500">
            No products match your filters in this location.
          </div>
        )}
      </div>

      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-[2px]"
            onClick={() => setCartOpen(false)}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-[#e5dccd] bg-white p-5 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#e5dccd] pb-3">
                <h3 className="text-lg font-semibold text-zinc-900">Your Cart</h3>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="text-sm font-semibold text-zinc-500 hover:text-zinc-900"
                >
                  Close
                </button>
              </div>

              {cartItems.length === 0 ? (
                <p className="py-10 text-center text-sm text-zinc-500">Your cart is empty.</p>
              ) : (
                <>
                  <div className="space-y-4 py-4">
                    {cartItems.map((item) => (
                      <article
                        key={item.id}
                        className="flex gap-3 rounded-2xl border border-[#e8dfd2] bg-[#fcfaf6] p-3"
                      >
                        <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-zinc-100">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-sm font-semibold">{item.name}</p>
                          <p className="mt-1 text-xs text-zinc-500">{item.grams}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <p className="text-sm font-semibold">${item.price}</p>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => updateCartQuantity(item.id, -1)}
                                className="h-7 w-7 rounded border border-[#d9cdb9] text-sm"
                              >
                                -
                              </button>
                              <span className="w-5 text-center text-sm">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateCartQuantity(item.id, 1)}
                                className="h-7 w-7 rounded border border-[#d9cdb9] text-sm"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="mt-2 text-xs font-semibold text-zinc-500 hover:text-zinc-900"
                          >
                            Remove
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>

                  <div className="border-t border-[#e5dccd] pt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-600">Subtotal</span>
                      <span className="text-lg font-semibold">${cartSubtotal.toFixed(2)}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCheckoutOpen(true)}
                      className="mt-4 h-11 w-full rounded-xl bg-[#1f1b16] text-sm font-semibold tracking-[0.1em] text-white transition hover:bg-[#13100c]"
                    >
                      CHECK OUT
                    </button>
                  </div>
                </>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {checkoutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-lg rounded-3xl border border-[#e5dccd] bg-white p-6 shadow-[0_30px_80px_rgba(35,27,18,0.32)]"
            >
              <div className="mb-4 flex items-center justify-between border-b border-[#e5dccd] pb-3">
                <h3 className="text-lg font-semibold">Checkout</h3>
                <button
                  type="button"
                  onClick={() => setCheckoutOpen(false)}
                  className="text-sm font-semibold text-zinc-500 hover:text-zinc-900"
                >
                  Close
                </button>
              </div>

              <form className="space-y-4" onSubmit={submitCheckout}>
                <input
                  value={checkoutName}
                  onChange={(event) => setCheckoutName(event.target.value)}
                  required
                  type="text"
                  placeholder="Full Name"
                  className="h-11 w-full rounded-lg border border-[#ded3bf] px-3 text-sm outline-none transition focus:border-[#9f8457]"
                />
                <input
                  value={checkoutEmail}
                  onChange={(event) => setCheckoutEmail(event.target.value)}
                  required
                  type="email"
                  placeholder="Email"
                  className="h-11 w-full rounded-lg border border-[#ded3bf] px-3 text-sm outline-none transition focus:border-[#9f8457]"
                />
                <input
                  value={checkoutPhone}
                  onChange={(event) => setCheckoutPhone(event.target.value)}
                  required
                  type="tel"
                  placeholder="Phone"
                  className="h-11 w-full rounded-lg border border-[#ded3bf] px-3 text-sm outline-none transition focus:border-[#9f8457]"
                />
                <textarea
                  value={checkoutNote}
                  onChange={(event) => setCheckoutNote(event.target.value)}
                  placeholder="Pickup note (optional)"
                  rows={3}
                  className="w-full rounded-lg border border-[#ded3bf] px-3 py-2 text-sm outline-none transition focus:border-[#9f8457]"
                />

                <div className="rounded-xl border border-[#e5dccd] bg-[#fcfaf6] px-3 py-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Items</span>
                    <span>{cartCount}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between font-semibold">
                    <span>Total</span>
                    <span>${cartSubtotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="h-11 w-full rounded-xl bg-[#1f1b16] text-sm font-semibold tracking-[0.1em] text-white transition hover:bg-[#13100c]"
                >
                  PLACE ORDER
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

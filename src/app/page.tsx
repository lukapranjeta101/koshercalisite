import Image from "next/image";
import Link from "next/link";
import SpiralScroll from "../../mycomponents/SpiralScroll";
import LatestDropShowcase from "../../mycomponents/LatestDropShowcase";
import LocationsPopGrid from "../../mycomponents/LocationsPopGrid";
import { SectionReveal, StaggerGroup, StaggerItem } from "../../mycomponents/SectionMotion";

export default function Home() {
  const locationImages = [
    {
      src: "/modesto.webp",
      title: "MODESTO",
      hours: "HOURS: DAILY 8AM to 10PM",
      line1: "4725 Yosemite Blvd",
      line2: "Modesto, CA 95357",
    },
    {
      src: "/patterson.webp",
      title: "PATTERSON",
      hours: "HOURS: DAILY 8AM to 10PM",
      line1: "520 Park Center Dr,",
      line2: "Patterson, CA 95363",
    },
    {
      src: "/oakdale.webp",
      title: "OAKDALE",
      hours: "HOURS: DAILY 8AM to 10PM",
      line1: "633 Armstrong Way",
      line2: "Oakdale, CA 95361",
    },
  ];

  return (
    <main className="relative text-white">
      <SpiralScroll scrollHeightVh={660} />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 min-h-[660vh] px-4 sm:px-10">
        <nav className="pointer-events-auto mx-auto w-full max-w-[1280px] pt-5 sm:pt-7">
          <div className="flex items-center justify-between md:hidden">
            <Link href="/" className="shrink-0">
              <Image src="/logo.webp" alt="Cali Kosher" width={108} height={76} priority />
            </Link>
            <div className="flex items-center gap-2">
              <a
                href="#locations"
                className="inline-flex h-9 items-center justify-center rounded-full border border-white/35 bg-black/35 px-4 text-[11px] font-semibold tracking-[0.12em] text-white backdrop-blur-sm"
              >
                LOCATIONS
              </a>
              <Link
                href="/store"
                className="inline-flex h-9 items-center justify-center rounded-full bg-white px-4 text-[11px] font-semibold tracking-[0.12em] text-black"
              >
                SHOP
              </Link>
            </div>
          </div>

          <div className="hidden grid-cols-3 items-center md:grid">
            <ul className="flex items-center justify-center gap-7 text-xs font-semibold tracking-[0.16em] sm:text-sm">
              <li>
                <Link href="/store" className="hover:opacity-80">
                  SHOP
                </Link>
              </li>
              <li className="text-zinc-400">•</li>
              <li>
                <a href="#experience" className="hover:opacity-80">
                  EXPERIENCE
                </a>
              </li>
            </ul>

            <Link href="/" className="mx-auto">
              <Image src="/logo.webp" alt="Cali Kosher" width={140} height={100} priority />
            </Link>

            <ul className="flex items-center justify-center gap-7 text-xs font-semibold tracking-[0.16em] sm:text-sm">
              <li>
                <a href="#locations" className="hover:opacity-80">
                  LOCATIONS
                </a>
              </li>
              <li className="text-zinc-400">•</li>
              <li>
                <a href="#experience" className="hover:opacity-80">
                  DETAILS
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <section className="mx-auto flex min-h-[84vh] max-w-[1280px] flex-col items-center justify-center pb-8 pt-8 text-center sm:min-h-[96vh] sm:pb-20 sm:pt-16">
          <p className="text-[clamp(2.1rem,6vw,5rem)] leading-none tracking-[0.04em]">
            YOUR LOCAL DISPENSARY
          </p>
          <p className="mt-5 text-[clamp(1.05rem,2.3vw,2rem)] tracking-[0.08em] text-zinc-100">
            MODESTO - OAKDALE - PATTERSON
          </p>

          <Link
            href="/store"
            className="pointer-events-auto mt-9 inline-flex h-14 w-full max-w-[320px] items-center justify-center bg-white px-10 text-base font-semibold tracking-[0.08em] text-black transition-colors hover:bg-zinc-200 sm:mt-12 sm:h-16 sm:min-w-[290px] sm:w-auto sm:px-14 sm:text-lg"
          >
            SHOP NOW
          </Link>
        </section>

        <section
          id="locations"
          className="pointer-events-auto mx-auto mt-0 flex min-h-[82vh] w-full max-w-[2200px] items-center px-2 py-8 sm:min-h-[100vh] sm:px-6 sm:py-16 md:px-8"
        >
          <div className="relative w-full overflow-hidden px-4 py-10 sm:px-10 sm:py-14 lg:px-16">
            <div className="relative text-center">
              <p className="text-xs font-semibold tracking-[0.2em] text-zinc-200">VISIT A LOCATION</p>
              <h2 className="mt-3 text-4xl font-light tracking-[0.04em] text-white sm:text-6xl lg:text-7xl">OUR LOCATIONS</h2>
              <p className="mx-auto mt-5 max-w-3xl text-sm text-zinc-200 sm:text-lg">
                Three storefronts, one premium standard. Explore each location and find what&apos;s closest to you.
              </p>
            </div>

            <LocationsPopGrid locations={locationImages} />
          </div>
        </section>

        <section className="pointer-events-auto mx-auto flex min-h-[62vh] w-full max-w-[1280px] items-center pb-8 [perspective:1400px] sm:min-h-[82vh] sm:pb-20">
          <div className="group w-full rounded-[1.5rem] border border-white/20 bg-black/45 p-4 shadow-[0_30px_70px_rgba(0,0,0,0.26)] backdrop-blur-sm transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] hover:[transform:translateY(10px)_rotateX(4deg)_rotateY(-3deg)_scale(0.987)] hover:shadow-[inset_0_18px_30px_rgba(0,0,0,0.2),0_18px_34px_rgba(0,0,0,0.3)] sm:rounded-[2rem] sm:p-7">
            <div className="grid items-center gap-7 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="grid gap-3 lg:grid-cols-[1fr_0.94fr]">
                <div className="grid gap-3">
                  <article className="overflow-hidden rounded-2xl">
                    <Image
                      src="/3pic.webp"
                      alt="Interior storefront view"
                      width={1400}
                      height={900}
                      className="h-[160px] w-full object-cover transition duration-500 ease-out group-hover:scale-[1.035] sm:h-[220px]"
                    />
                  </article>
                  <article className="overflow-hidden rounded-2xl">
                    <Image
                      src="/4pic.webp"
                      alt="Store counter view"
                      width={1400}
                      height={900}
                      className="h-[160px] w-full object-cover transition duration-500 ease-out group-hover:scale-[1.035] sm:h-[220px]"
                    />
                  </article>
                </div>

                <article className="overflow-hidden rounded-2xl">
                  <Image
                    src="/5pic.webp"
                    alt="Exterior storefront view"
                    width={1400}
                    height={1600}
                    className="h-[320px] w-full object-cover transition duration-500 ease-out group-hover:scale-[1.035] sm:h-[453px]"
                  />
                </article>
              </div>

              <div className="text-center lg:text-left">
                <p className="text-xs font-semibold tracking-[0.18em] text-zinc-300">STOREFRONT PREVIEW</p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-4xl">
                  A cleaner look at every location
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-200 sm:text-base">
                  Explore each storefront before you visit. From interior flow to pickup counter layout, every
                  location keeps the same premium Cali Kosher standard.
                </p>
                <Link
                  href="/store"
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 text-sm font-semibold tracking-[0.08em] text-white transition hover:bg-white hover:text-black"
                >
                  VIEW STORE MENU
                </Link>
              </div>
            </div>
          </div>
        </section>

        <SectionReveal
          id="experience"
          className="pointer-events-auto mx-auto mt-0 flex min-h-[92vh] w-full max-w-[1280px] items-center px-2 py-8 sm:py-12"
        >
          <StaggerGroup className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <StaggerItem>
                <p className="text-xs font-semibold tracking-[0.2em] text-zinc-300">THE CALI STANDARD</p>
              </StaggerItem>
              <StaggerItem>
                <h2 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
                  One Premium Experience, Every Visit
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="mt-5 max-w-2xl text-zinc-200">
                  From first browse to pickup, every detail is built for speed, discretion, and top-shelf quality.
                  Reserve online in minutes and visit the location that fits your day.
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/store"
                    className="inline-flex h-12 items-center justify-center border border-white bg-white px-7 text-sm font-semibold tracking-[0.1em] text-black transition hover:bg-zinc-200"
                  >
                    SHOP MENU
                  </Link>
                  <a
                    href="tel:+12095550101"
                    className="inline-flex h-12 items-center justify-center border border-white/40 bg-white/10 px-7 text-sm font-semibold tracking-[0.1em] transition hover:border-white hover:bg-white hover:text-black"
                  >
                    CALL SUPPORT
                  </a>
                </div>
              </StaggerItem>
            </div>

            <StaggerGroup className="grid gap-4">
              <StaggerItem>
                <article className="rounded-2xl border border-white/30 p-5 backdrop-blur-[2px]">
                  <p className="text-xs tracking-[0.16em] text-zinc-300">FAST RESERVE</p>
                  <p className="mt-2 text-xl font-semibold">Build your order in minutes</p>
                </article>
              </StaggerItem>
              <StaggerItem>
                <article className="rounded-2xl border border-white/30 p-5 backdrop-blur-[2px]">
                  <p className="text-xs tracking-[0.16em] text-zinc-300">OPEN DAILY</p>
                  <p className="mt-2 text-xl font-semibold">8AM - 10PM at all locations</p>
                </article>
              </StaggerItem>
              <StaggerItem>
                <article className="rounded-2xl border border-white/30 p-5 backdrop-blur-[2px]">
                  <p className="text-xs tracking-[0.16em] text-zinc-300">CURATED SELECTION</p>
                  <p className="mt-2 text-xl font-semibold">Premium flower, carts, extracts, and more</p>
                </article>
              </StaggerItem>
            </StaggerGroup>
          </StaggerGroup>
        </SectionReveal>

        <section className="pointer-events-auto mx-auto mt-0 flex min-h-[62vh] w-full max-w-[1280px] items-center px-2 py-6 sm:min-h-[92vh] sm:py-12">
          <div className="w-full">
            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-300">MEMBERSHIP</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">Join The Inner Circle</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <article className="rounded-2xl border border-white/30 p-6">
                <p className="text-xs tracking-[0.14em] text-zinc-300">VIP ALERTS</p>
                <p className="mt-2 text-lg font-semibold">Priority drop notifications</p>
              </article>
              <article className="rounded-2xl border border-white/30 p-6">
                <p className="text-xs tracking-[0.14em] text-zinc-300">EARLY ACCESS</p>
                <p className="mt-2 text-lg font-semibold">Limited releases before public launch</p>
              </article>
              <article className="rounded-2xl border border-white/30 p-6">
                <p className="text-xs tracking-[0.14em] text-zinc-300">PERSONAL PICKS</p>
                <p className="mt-2 text-lg font-semibold">Curated recommendations by location</p>
              </article>
            </div>
          </div>
        </section>

        <section className="pointer-events-auto mx-auto mt-0 flex min-h-[66vh] w-full max-w-[1280px] items-center px-2 py-6 pb-10 sm:min-h-[92vh] sm:py-12 sm:pb-12">
          <div className="w-full">
            <p className="text-center text-xs font-semibold tracking-[0.2em] text-zinc-300">LATEST DROP</p>
            <h2 className="mt-3 text-center text-3xl font-semibold sm:text-5xl">Fresh This Week</h2>
            <LatestDropShowcase />
            <div className="mt-8 flex justify-center">
              <Link
                href="/store"
                className="inline-flex h-12 items-center justify-center border border-white bg-white px-7 text-sm font-semibold tracking-[0.1em] text-black transition hover:bg-zinc-200"
              >
                VIEW FULL MENU
              </Link>
            </div>
          </div>
        </section>
      </div>

      <section className="relative z-10 min-h-[100vh] overflow-hidden bg-white sm:min-h-[120vh]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,0,0,0.06),transparent_40%),radial-gradient(circle_at_85%_80%,rgba(0,0,0,0.05),transparent_46%)]" />
        <div className="relative w-full px-4 py-14 sm:px-10 sm:py-24 lg:px-16">
          <div className="mx-auto grid max-w-[1400px] items-center gap-10 md:grid-cols-2 md:gap-12">
            <div className="max-w-xl">
              <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">DOWNLOAD THE APP</p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.04] text-zinc-900 sm:text-5xl">
                The Kosher Cali app is where it&apos;s at
              </h2>
              <p className="mt-6 text-base leading-relaxed text-zinc-600">
                Browse location-specific menus for Modesto, Oakdale, and Patterson, then reserve your order in just a
                few taps.
              </p>
              <p className="mt-4 text-base leading-relaxed text-zinc-600">
                It keeps the full pickup flow fast and organized, so you can discover premium products and check out
                with less friction.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-xs font-semibold tracking-[0.08em] text-zinc-700">
                  LIVE MENUS
                </span>
                <span className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-xs font-semibold tracking-[0.08em] text-zinc-700">
                  FAST PICKUP
                </span>
                <span className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-xs font-semibold tracking-[0.08em] text-zinc-700">
                  LOCATION FILTERS
                </span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[640px]">
              <div className="absolute -inset-4 rounded-[2.2rem] bg-gradient-to-b from-zinc-200/70 to-zinc-100/30" />
              <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-3 shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.4rem] bg-zinc-100">
                  <Image
                    src="/phone.png"
                    alt="Kosher Cali app preview"
                    fill
                    priority
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:mt-10 md:gap-4 md:justify-start">
            <a
              href="#"
              className="inline-flex items-center justify-center"
            >
              <Image
                src="/app-store.avif"
                alt="Download on the App Store"
                width={220}
                height={72}
                className="h-12 w-auto"
              />
            </a>

            <a
              href="#"
              className="inline-flex items-center justify-center"
            >
              <Image
                src="/google-play.avif"
                alt="Get it on Google Play"
                width={220}
                height={72}
                className="h-12 w-auto"
              />
            </a>
          </div>
        </div>
      </section>

      <section className="relative z-10 overflow-hidden bg-black">
        <Image
          src="/beach.jpeg"
          alt="Beach scene"
          width={2200}
          height={1400}
          className="h-[110vh] w-full object-cover object-top sm:h-[120vh] md:h-[130vh]"
        />
        <div className="absolute inset-0 bg-black/62" />

        <div className="absolute inset-0 overflow-y-auto">
          <div className="mx-auto grid w-full max-w-[1600px] gap-8 px-4 py-8 sm:px-10 md:grid-cols-12 md:py-14 lg:px-14">
            <div className="md:col-span-7 text-left text-white">
              <p className="text-xs font-semibold tracking-[0.24em] text-zinc-300">GROWN IN THE HEART OF CALIFORNIA</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[0.04em] sm:text-5xl lg:text-6xl">SINGLE SOURCE</h2>

              <article className="mt-8 border-t border-white/20 pt-6 sm:mt-10 sm:pt-8">
                <p className="text-sm leading-relaxed text-zinc-100 sm:text-base">
                  We handle every step of the Cannabis process. All of our plants start in our nursery and are
                  transplanted to our flowering greenhouses. Once harvested, we properly store and dry our flower, hand
                  trim each nug, and then package the flower or send it to our manufacturing lab to create our own
                  solvent and solventless products.
                </p>
              </article>

              <article className="mt-8 border-t border-white/20 pt-6 sm:mt-10 sm:pt-8">
                <h3 className="text-xl font-semibold tracking-[0.05em]">ORGANIC FARMING</h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-100 sm:text-base">
                  We are committed to organic farming and take pride in using live soil to produce the best possible
                  environment for our cannabis crops, resulting in a superior terpene profile. We are also EnvirOganic
                  Certified, which means our farm passes regular testing by EnviroCann and maintains the standards they
                  require.
                </p>
              </article>

              <article className="mt-8 border-t border-white/20 pt-6 sm:mt-10 sm:pt-8">
                <h3 className="text-xl font-semibold tracking-[0.05em]">KOSHER CERTIFIED</h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-100 sm:text-base">
                  We comply with a strict policy of kosher laws that include some of the highest standards of purity and
                  quality. We take great care to ensure that every operation in our farm follows these standards as one
                  of the only Kosher Cannabis farms in the United States. Our farm is regularly inspected and certified
                  by a Rabbi.
                </p>
              </article>
            </div>

            <div className="md:col-span-5">
              <div className="md:sticky md:top-20">
                <div className="overflow-hidden rounded-3xl border border-white/20 bg-black/45 p-6 backdrop-blur-sm">
                  <p className="text-xs font-semibold tracking-[0.18em] text-zinc-300">FARM PRINCIPLES</p>
                  <div className="mt-5 grid gap-3">
                    <div className="rounded-2xl border border-white/20 bg-black/55 p-4">
                      <p className="text-sm font-semibold tracking-[0.08em] text-white">Single Source Cultivation</p>
                      <p className="mt-1 text-xs text-zinc-300">Nursery to final product under one standard.</p>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-black/55 p-4">
                      <p className="text-sm font-semibold tracking-[0.08em] text-white">Live Soil Methods</p>
                      <p className="mt-1 text-xs text-zinc-300">Organic-first approach for terpene-rich results.</p>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-black/55 p-4">
                      <p className="text-sm font-semibold tracking-[0.08em] text-white">Kosher Oversight</p>
                      <p className="mt-1 text-xs text-zinc-300">Regular Rabbi inspection and certification.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/20 bg-black/45 p-4 text-center">
                    <p className="text-3xl font-semibold text-white">100%</p>
                    <p className="mt-1 text-xs tracking-[0.12em] text-zinc-300">IN-HOUSE CONTROL</p>
                  </div>
                  <div className="rounded-2xl border border-white/20 bg-black/45 p-4 text-center">
                    <p className="text-3xl font-semibold text-white">3</p>
                    <p className="mt-1 text-xs tracking-[0.12em] text-zinc-300">CORE STANDARDS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-white px-4 py-14 text-zinc-900 sm:px-10 sm:py-20">
        <div className="mx-auto w-full max-w-[1300px]">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-[0.06em] text-zinc-500">FEATURED PICKS</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">Great Flower You Can Find Today</h2>
            <p className="mt-3 text-base text-zinc-600">Top strains available now across Cali Kosher locations.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <article className="rounded-3xl border border-zinc-200 bg-white p-6 text-center">
              <p className="mx-auto inline-flex rounded-full bg-zinc-100 px-4 py-1 text-xs font-semibold text-zinc-600">
                Top happy strain in your area
              </p>
              <div className="mt-6 flex justify-center">
                <Image src="/one.png" alt="Cherry Pie strain" width={250} height={250} className="h-[180px] w-auto object-contain" />
              </div>
              <h3 className="mt-4 text-3xl font-semibold">Cherry Pie</h3>
              <p className="mt-2 text-sm text-zinc-500">aka Cherry Pie Kush</p>
              <p className="mt-3 text-sm text-zinc-700">4.3 ★★★★☆ (2,199)</p>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-zinc-600">
                <span className="rounded bg-zinc-100 px-2 py-1">Hybrid</span>
                <span>THC 16%</span>
                <span>CBG 1%</span>
              </div>
              <Link href="/store" className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#3d4f72] px-5 text-sm font-semibold text-white transition hover:bg-[#334462]">
                learn more
              </Link>
            </article>

            <article className="rounded-3xl border border-zinc-200 bg-white p-6 text-center">
              <p className="mx-auto inline-flex rounded-full bg-zinc-100 px-4 py-1 text-xs font-semibold text-zinc-600">
                Top euphoric strain in your area
              </p>
              <div className="mt-6 flex justify-center">
                <Image src="/two.png" alt="Gelato strain" width={250} height={250} className="h-[180px] w-auto object-contain" />
              </div>
              <h3 className="mt-4 text-3xl font-semibold">Gelato</h3>
              <p className="mt-2 text-sm text-zinc-500">aka Gelato 42, Larry Bird</p>
              <p className="mt-3 text-sm text-zinc-700">4.6 ★★★★☆ (2,527)</p>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-zinc-600">
                <span className="rounded bg-zinc-100 px-2 py-1">Hybrid</span>
                <span>THC 21%</span>
                <span>CBD 0%</span>
              </div>
              <Link href="/store" className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#3d4f72] px-5 text-sm font-semibold text-white transition hover:bg-[#334462]">
                learn more
              </Link>
            </article>

            <article className="rounded-3xl border border-zinc-200 bg-white p-6 text-center">
              <p className="mx-auto inline-flex rounded-full bg-zinc-100 px-4 py-1 text-xs font-semibold text-zinc-600">
                Top aroused strain in your area
              </p>
              <div className="mt-6 flex justify-center">
                <Image src="/three.png" alt="Cereal Milk strain" width={250} height={250} className="h-[180px] w-auto object-contain" />
              </div>
              <h3 className="mt-4 text-3xl font-semibold">Cereal Milk</h3>
              <p className="mt-2 text-sm text-zinc-500">aka Milk, Cereal Milk #2</p>
              <p className="mt-3 text-sm text-zinc-700">4.5 ★★★★☆ (740)</p>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-zinc-600">
                <span className="rounded bg-zinc-100 px-2 py-1">Hybrid</span>
                <span>THC 25%</span>
                <span>CBG 1%</span>
              </div>
              <Link href="/store" className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#3d4f72] px-5 text-sm font-semibold text-white transition hover:bg-[#334462]">
                learn more
              </Link>
            </article>
          </div>
        </div>
      </section>

      <footer className="relative z-10 overflow-hidden border-t border-zinc-800 bg-black text-zinc-200">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.07),transparent_30%),radial-gradient(circle_at_86%_86%,rgba(255,255,255,0.05),transparent_34%)]" />
        <div className="relative mx-auto grid w-full max-w-[1300px] gap-10 px-6 py-14 sm:px-10 lg:grid-cols-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-400">CALI KOSHER</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-300">
              Premium cannabis menus, fast reserve flow, and smooth pickup across Modesto, Oakdale, and Patterson.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-zinc-400">QUICK LINKS</p>
            <div className="mt-4 grid gap-2 text-sm">
              <Link href="/store" className="transition hover:text-white">Shop Menu</Link>
              <a href="#locations" className="transition hover:text-white">Our Locations</a>
              <a href="#experience" className="transition hover:text-white">The Cali Standard</a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-zinc-400">LOCATIONS</p>
            <div className="mt-4 grid gap-2 text-sm text-zinc-300">
              <p>Modesto</p>
              <p>Patterson</p>
              <p>Oakdale</p>
              <p className="pt-1 text-xs tracking-[0.12em] text-zinc-500">OPEN DAILY · 8AM - 10PM</p>
            </div>
          </div>

          <div id="contact">
            <p className="text-xs font-semibold tracking-[0.16em] text-zinc-400">CONTACT</p>
            <div className="mt-4 grid gap-2 text-sm">
              <a href="tel:+12095550101" className="transition hover:text-white">(209) 555-0101</a>
              <a href="mailto:hello@calikosher.com" className="transition hover:text-white">hello@calikosher.com</a>
              <Link href="/store" className="pt-1 text-xs font-semibold tracking-[0.14em] text-zinc-400 transition hover:text-white">
                START YOUR ORDER
              </Link>
            </div>
          </div>
        </div>

        <div className="relative border-t border-zinc-800/90">
          <div className="mx-auto flex w-full max-w-[1300px] flex-col items-center justify-between gap-3 px-6 py-5 text-xs tracking-[0.12em] text-zinc-400 sm:flex-row sm:px-10">
            <p>© 2026 CALI KOSHER. ALL RIGHTS RESERVED.</p>
            <p>MODERN RESERVE EXPERIENCE</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

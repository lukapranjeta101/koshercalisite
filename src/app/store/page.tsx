import Image from "next/image";
import Link from "next/link";
import Storefront from "../../../mycomponents/Storefront";

export default function StorePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <nav className="mx-auto w-full max-w-[1280px] bg-black px-4 pb-4 pt-5 text-white shadow-[0_18px_38px_rgba(0,0,0,0.35)] sm:px-10 sm:pt-7">
        <div className="flex items-center justify-between md:hidden">
          <Link href="/" className="shrink-0">
            <Image src="/logo.webp" alt="Cali Kosher" width={108} height={76} priority />
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              className="inline-flex h-9 items-center justify-center rounded-full border border-white/40 px-4 text-[11px] font-semibold tracking-[0.12em]"
            >
              CONTACT
            </Link>
            <Link
              href="/#locations"
              className="inline-flex h-9 items-center justify-center rounded-full bg-white px-4 text-[11px] font-semibold tracking-[0.12em] text-black"
            >
              LOCATIONS
            </Link>
          </div>
        </div>

        <div className="hidden grid-cols-3 items-center md:grid">
          <ul className="flex items-center justify-center gap-7 text-xs font-semibold tracking-[0.16em] sm:text-sm">
            <li>
              <Link href="/" className="hover:text-zinc-300">
                HOME
              </Link>
            </li>
            <li className="text-zinc-500">•</li>
            <li>
              <Link href="/#locations" className="hover:text-zinc-300">
                LOCATIONS
              </Link>
            </li>
          </ul>

          <Link href="/" className="mx-auto">
            <Image src="/logo.webp" alt="Cali Kosher" width={140} height={100} priority />
          </Link>

          <ul className="flex items-center justify-center gap-7 text-xs font-semibold tracking-[0.16em] sm:text-sm">
            <li>
              <Link href="/store" className="hover:text-zinc-300">
                SHOP
              </Link>
            </li>
            <li className="text-zinc-500">•</li>
            <li>
              <Link href="/#contact" className="hover:text-zinc-300">
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Storefront />
    </main>
  );
}

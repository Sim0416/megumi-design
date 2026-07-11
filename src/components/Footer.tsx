import Image from "next/image";
import type { SiteSettings } from "@/sanity/lib/types";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="relative border-t border-gold-700/20 bg-ink-950 pb-8 pt-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Image
              src="/logo.webp"
              alt="Megumi Design"
              width={220}
              height={78}
              className="h-14 w-auto"
            />
            <p className="mt-5 max-w-xs font-body text-sm leading-relaxed text-paper-100/50">
              Furniture and cabinetry crafted for human and pet-friendly
              living — designed and built in Batu Pahat, Johor.
            </p>
          </div>

          <div>
            <h4 className="font-display text-base tracking-[0.2em] text-gold-400">
              Explore
            </h4>
            <ul className="mt-5 space-y-3 font-body text-base text-paper-100/60">
              <li><a href="#about" className="hover:text-gold-400">About</a></li>
              <li><a href="#services" className="hover:text-gold-400">Services</a></li>
              <li><a href="#portfolio" className="hover:text-gold-400">Portfolio</a></li>
              <li><a href="#contact" className="hover:text-gold-400">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base tracking-[0.2em] text-gold-400">
              Contact
            </h4>
            <ul className="mt-5 space-y-3 font-body text-base text-paper-100/60">
              <li>{settings.address}</li>
              <li>
                <a href={`tel:${settings.officePhone}`} className="hover:text-gold-400">
                  {settings.officePhone}
                </a>
              </li>
              <li>
                <a href={`mailto:${settings.email}`} className="hover:text-gold-400">
                  {settings.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gold-700/10 pt-6 text-center font-body text-xs text-paper-100/40 md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} Megumi Design Sdn Bhd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

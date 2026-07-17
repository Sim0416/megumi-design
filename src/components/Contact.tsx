"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";
import { SectionKicker } from "./SectionKicker";
import type { SiteSettings } from "@/sanity/lib/types";

export function Contact({ settings }: { settings: SiteSettings }) {
  const [sent, setSent] = useState(false);

  const address = settings.address ?? "";
  const mapEmbedUrl =
    settings.mapUrl ?? `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");

    const whatsappNumber = (settings.mobilePhone ?? "6012-306 2889").replace(/\D/g, "");
    const text = encodeURIComponent(
      `Enquiry from ${name} (${email})\n\n${message}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
    setSent(true);
  }

  return (
    <section
      id="contact"
      className="washi-grain relative bg-ink-900 py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center">
          <SectionKicker en="Get in Touch" align="center" />
          <Reveal direction="up" delay={0.1}>
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-extrabold leading-tight text-paper-50 sm:text-5xl md:text-6xl">
              Visit &amp; Consult With Us
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.15}>
            <p className="mx-auto mt-5 max-w-xl font-body text-base leading-relaxed text-paper-100/60 md:text-lg">
              Thank you for considering Megumi Design. Fill in your details
              and our team will follow up with you shortly.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-5 md:gap-16">
          <Reveal direction="right" className="md:col-span-2">
            <dl className="space-y-8">
              <div>
                <dt className="font-display text-base tracking-[0.2em] text-gold-400">
                  Address
                </dt>
                <dd className="mt-2 font-body text-base leading-relaxed text-paper-100/75 md:text-lg">
                  {settings.address}
                </dd>
              </div>
              <div>
                <dt className="font-display text-base tracking-[0.2em] text-gold-400">
                  Phone
                </dt>
                <dd className="mt-2 font-body text-base leading-relaxed text-paper-100/75 md:text-lg">
                  <a href={`tel:${settings.officePhone}`} className="block hover:text-gold-400">
                    {settings.officePhone}
                  </a>
                  <a href={`tel:${settings.mobilePhone}`} className="block hover:text-gold-400">
                    {settings.mobilePhone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-display text-base tracking-[0.2em] text-gold-400">
                  Email
                </dt>
                <dd className="mt-2 font-body text-base leading-relaxed text-paper-100/75 md:text-lg">
                  <a href={`mailto:${settings.email}`} className="hover:text-gold-400">
                    {settings.email}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="group relative mt-10 aspect-video w-full overflow-hidden rounded-sm border border-gold-700/30">
              <iframe
                src={mapEmbedUrl}
                loading="lazy"
                className="h-full w-full grayscale-[35%] contrast-[1.1] transition-[filter] duration-500 group-hover:grayscale-0"
                title="Megumi Design location"
              />
              <a
                href={mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 z-10 rounded-full border border-gold-500/50 bg-ink-950/80 px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.15em] text-gold-400 backdrop-blur-sm transition-colors hover:bg-gold-500 hover:text-ink-950"
              >
                Open in Google Maps ↗
              </a>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="md:col-span-3">
            {sent ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-sm border border-gold-500/30 bg-ink-950/50 p-10 text-center">
                <span className="font-display text-4xl font-extrabold text-gold-400">
                  Thank You
                </span>
                <p className="mt-4 font-body text-base text-paper-100/70">
                  We&rsquo;ve opened WhatsApp with your message — just hit
                  send there to reach our team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <label className="flex flex-col gap-2 sm:col-span-1">
                  <span className="font-body text-sm uppercase tracking-[0.2em] text-paper-100/60">
                    Name
                  </span>
                  <input
                    required
                    name="name"
                    type="text"
                    className="border-b border-gold-700/40 bg-transparent py-3 font-body text-lg text-paper-50 outline-none transition-colors focus:border-gold-400"
                  />
                </label>
                <label className="flex flex-col gap-2 sm:col-span-1">
                  <span className="font-body text-sm uppercase tracking-[0.2em] text-paper-100/60">
                    Email
                  </span>
                  <input
                    required
                    name="email"
                    type="email"
                    className="border-b border-gold-700/40 bg-transparent py-3 font-body text-lg text-paper-50 outline-none transition-colors focus:border-gold-400"
                  />
                </label>
                <label className="flex flex-col gap-2 sm:col-span-2">
                  <span className="font-body text-sm uppercase tracking-[0.2em] text-paper-100/60">
                    Message
                  </span>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    className="resize-none border-b border-gold-700/40 bg-transparent py-3 font-body text-lg text-paper-50 outline-none transition-colors focus:border-gold-400"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-2 w-fit rounded-full bg-gold-500 px-9 py-4 font-body text-sm font-semibold uppercase tracking-[0.2em] text-ink-950 transition-transform hover:scale-[1.02] hover:bg-gold-400 sm:col-span-2"
                >
                  Send via WhatsApp
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

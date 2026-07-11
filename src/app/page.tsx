import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { FactoryGallery } from "@/components/FactoryGallery";
import { Exhibition } from "@/components/Exhibition";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Marquee } from "@/components/Marquee";
import { getProjects, getServices, getSiteSettings } from "@/sanity/lib/content";
import { fallbackAboutParagraphs } from "@/sanity/lib/fallback";

export default async function HomePage() {
  const [settings, services, projects] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getProjects(),
  ]);

  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero settings={settings} />
        <Marquee
          items={[
            "Craftsmanship",
            "Batu Pahat, Johor",
            "Modern Minimalist Design",
            "Pet-Friendly Living",
          ]}
        />
        <About settings={settings} fallbackParagraphs={fallbackAboutParagraphs} />
        <FactoryGallery settings={settings} />
        <Exhibition settings={settings} />
        <Services services={services} />
        <Portfolio projects={projects} />
        <Marquee
          items={[
            "EFE Exhibitor 2026",
            "Custom OEM Furniture",
            "46,134 sq ft Facility",
            "Made in Malaysia",
          ]}
          duration={24}
        />
        <Contact settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}

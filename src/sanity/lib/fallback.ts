import type { Project, Service, SiteSettings } from "./types";

/**
 * Content mirrors what is published on megumidesign.net today. It renders
 * out of the box before the Sanity project is connected, and every field
 * here is editable from /studio once NEXT_PUBLIC_SANITY_PROJECT_ID is set —
 * Studio values simply take over per-field.
 */
export const fallbackSiteSettings: SiteSettings = {
  heroKicker: "匠の技",
  heroTitle: "Make your lifestyle outstanding.",
  heroSubtitle:
    "Megumi Design — furniture and cabinetry crafted for human and pet-friendly living. Designed and built at our 46,134 sq ft facility in Batu Pahat, Johor.",
  aboutTitle: "The Spirit of Craftsmanship",
  quoteText:
    "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
  quoteAuthor: "Brian Herbert",
  stats: [
    { value: "46,134", suffix: "sq ft", label: "Manufacturing Facility" },
    { value: "9", suffix: "+", label: "Furniture Categories" },
    { value: "2026", label: "EFE Expo Exhibitor" },
    { value: "100", suffix: "%", label: "Custom Craftsmanship" },
  ],
  address:
    "No.11B, Jalan Lingkaran Bentara 1, Pusat Komersial Bentara, 83300 Batu Pahat, Johor, Malaysia",
  officePhone: "+607-599 9017",
  mobilePhone: "+6012-306 2889",
  email: "enquirymegumi@gmail.com",
};

export const fallbackAboutParagraphs: string[] = [
  "Megumi Design Sdn Bhd is a furniture and cabinetry design company redefining living spaces by integrating human and pet comfort through thoughtful, considered design.",
  "Showcasing our craft at our own factory in Batu Pahat, Sri Gading, Johor, we transform residential, commercial and public spaces into timeless environments — built with clean aesthetics and functional innovation, not temporary trends.",
  "Every piece leaves our 46,134 sq ft facility complete and considered, from tender projects and OEM export furniture to modern minimalist interiors for the home.",
];

export const fallbackServices: Service[] = [
  {
    _id: "fallback-tender-project",
    title: "Tender Project",
    excerpt: "Local interior design for residential and commercial spaces.",
  },
  {
    _id: "fallback-sofa",
    title: "Sofa",
    excerpt: "Minimalist, geometric sofa designs built for everyday comfort.",
  },
  {
    _id: "fallback-oem",
    title: "Exporting OEM Furniture",
    excerpt:
      "Custom OEM pieces including wardrobes, bookshelves, TV cabinets and tables.",
  },
  {
    _id: "fallback-bedroom",
    title: "Bedroom",
    excerpt: "Cozy living spaces finished with stylish, considered decor.",
  },
  {
    _id: "fallback-modern-minimalist",
    title: "Modern Minimalist Interior Design",
    excerpt: "Geometric aesthetics guided by minimalist design principles.",
  },
  {
    _id: "fallback-pet-cabinet",
    title: "Pet Cabinet & Furniture",
    excerpt: "Pet-integrated furniture for modern, shared living.",
  },
];

const fallbackCategories = [
  "Sofa",
  "Pet Cabinet & Furniture",
  "Bedroom",
  "TV Console / Cabinet",
  "Study Table",
  "Shoes Cabinet / Rack",
  "Bookshelf Cabinet",
  "Kitchen Cabinet",
  "Wardrobe / Sliding Door / Open Door",
];

export const fallbackProjects: Project[] = fallbackCategories.map(
  (category, i) => ({
    _id: `fallback-project-${i}`,
    title: category,
    category,
    excerpt: "Add photos for this collection from the Studio.",
    featured: i < 6,
  })
);

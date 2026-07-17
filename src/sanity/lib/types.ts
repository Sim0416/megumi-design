import type { Image, PortableTextBlock } from "sanity";

export interface Stat {
  value: string;
  suffix?: string;
  label: string;
}

export interface SiteSettings {
  heroKicker?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: Image;
  aboutTitle?: string;
  aboutBody?: PortableTextBlock[];
  aboutImage?: Image;
  quoteText?: string;
  quoteAuthor?: string;
  stats?: Stat[];
  factoryTitle?: string;
  factoryDescription?: string;
  factoryImages?: Image[];
  exhibitionTitle?: string;
  exhibitionDescription?: string;
  exhibitionMeta?: string;
  exhibitionBadge?: Image;
  exhibitionImages?: Image[];
  address?: string;
  officePhone?: string;
  mobilePhone?: string;
  email?: string;
  mapUrl?: string;
}

export interface Service {
  _id: string;
  title: string;
  excerpt?: string;
  image?: Image;
  gallery?: Image[];
  slug?: string;
}

export interface Project {
  _id: string;
  title: string;
  coverImage?: Image;
  gallery?: Image[];
  excerpt?: string;
  featured?: boolean;
  slug?: string;
}

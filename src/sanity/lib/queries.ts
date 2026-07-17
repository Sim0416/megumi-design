import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    heroKicker,
    heroTitle,
    heroSubtitle,
    heroImage,
    aboutTitle,
    aboutBody,
    aboutImage,
    quoteText,
    quoteAuthor,
    stats,
    factoryTitle,
    factoryDescription,
    factoryImages,
    exhibitionTitle,
    exhibitionDescription,
    exhibitionMeta,
    exhibitionBadge,
    exhibitionImages,
    address,
    officePhone,
    mobilePhone,
    email,
    mapUrl
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc){
    _id,
    title,
    excerpt,
    image,
    gallery,
    "slug": slug.current
  }
`;

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc){
    _id,
    title,
    category,
    coverImage,
    gallery,
    excerpt,
    featured,
    "slug": slug.current
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc){
    _id,
    title,
    category,
    coverImage,
    excerpt,
    "slug": slug.current
  }
`;

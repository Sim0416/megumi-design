import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "作品 Portfolio",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "作品名称",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "分类",
      type: "string",
      options: {
        list: [
          { title: "Tender Project", value: "Tender Project" },
          { title: "Sofa", value: "Sofa" },
          { title: "Exporting OEM Furniture", value: "Exporting OEM Furniture" },
          { title: "Bedroom", value: "Bedroom" },
          { title: "Modern Minimalist Interior Design", value: "Modern Minimalist Interior Design" },
          { title: "Pet Cabinet & Furniture", value: "Pet Cabinet & Furniture" },
          { title: "TV Console / Cabinet", value: "TV Console / Cabinet" },
          { title: "Study Table", value: "Study Table" },
          { title: "Shoes Cabinet / Rack", value: "Shoes Cabinet / Rack" },
          { title: "Bookshelf Cabinet", value: "Bookshelf Cabinet" },
          { title: "Kitchen Cabinet", value: "Kitchen Cabinet" },
          { title: "Wardrobe / Sliding Door / Open Door", value: "Wardrobe / Sliding Door / Open Door" },
        ],
      },
    }),
    defineField({
      name: "coverImage",
      title: "封面图",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "作品图集",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "excerpt",
      title: "简短描述",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "featured",
      title: "首页精选",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "排序（数字越小越靠前）",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "排序 Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});

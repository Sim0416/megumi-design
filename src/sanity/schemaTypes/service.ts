import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "服务 Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "服务名称",
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
      name: "excerpt",
      title: "简短描述",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "详细内容",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "图片",
      type: "image",
      options: { hotspot: true },
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
    select: { title: "title", subtitle: "excerpt", media: "image" },
  },
});

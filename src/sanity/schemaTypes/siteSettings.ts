import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "网站设置 Site Settings",
  type: "document",
  groups: [
    { name: "hero", title: "首页 Hero" },
    { name: "about", title: "关于 About" },
    { name: "stats", title: "数据 Stats" },
    { name: "factory", title: "工厂 Factory" },
    { name: "exhibition", title: "展会 Exhibition" },
    { name: "contact", title: "联系方式 Contact" },
  ],
  fields: [
    defineField({
      name: "heroKicker",
      title: "Hero 小标题（日文）",
      type: "string",
      group: "hero",
      initialValue: "匠の技",
      description: "显示在主标题上方的日文短句",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero 主标题",
      type: "string",
      group: "hero",
      initialValue: "Make your lifestyle outstanding.",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero 副文案",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Hero 背景图",
      type: "image",
      group: "hero",
      options: { hotspot: true },
    }),
    defineField({
      name: "aboutTitle",
      title: "About 标题",
      type: "string",
      group: "about",
      initialValue: "The Spirit of Craftsmanship",
    }),
    defineField({
      name: "aboutBody",
      title: "About 内容",
      type: "array",
      group: "about",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "aboutImage",
      title: "About 图片",
      type: "image",
      group: "about",
      options: { hotspot: true },
    }),
    defineField({
      name: "quoteText",
      title: "引言",
      type: "text",
      rows: 2,
      group: "about",
      initialValue:
        "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
    }),
    defineField({
      name: "quoteAuthor",
      title: "引言作者",
      type: "string",
      group: "about",
      initialValue: "Brian Herbert",
    }),
    defineField({
      name: "stats",
      title: "数据统计",
      type: "array",
      group: "stats",
      of: [
        {
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", title: "数值 (e.g. 46,134)", type: "string" }),
            defineField({ name: "suffix", title: "单位 (e.g. sq ft)", type: "string" }),
            defineField({ name: "label", title: "说明", type: "string" }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
    }),
    defineField({
      name: "factoryTitle",
      title: "工厂标题",
      type: "string",
      group: "factory",
      initialValue: "Inside Our Factory",
    }),
    defineField({
      name: "factoryDescription",
      title: "工厂简介",
      type: "text",
      rows: 3,
      group: "factory",
      initialValue:
        "A look inside our 46,134 sq ft facility in Batu Pahat, Johor — where every piece is designed, built and finished in-house.",
    }),
    defineField({
      name: "factoryImages",
      title: "工厂照片（建议 6 张，用于对称排版）",
      type: "array",
      group: "factory",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: "exhibitionTitle",
      title: "展会标题",
      type: "string",
      group: "exhibition",
      initialValue: "As Seen at EFE Export Furniture Exhibition",
    }),
    defineField({
      name: "exhibitionDescription",
      title: "展会简介",
      type: "text",
      rows: 3,
      group: "exhibition",
      initialValue:
        "Megumi Design exhibited at EFE — Export Furniture Exhibition Malaysia, 3–6 March 2026 at KLCC — showcasing our craftsmanship to international buyers and partners.",
    }),
    defineField({
      name: "exhibitionMeta",
      title: "展会时间/地点（例如 3–6 MARCH 2026 · KLCC, MALAYSIA）",
      type: "string",
      group: "exhibition",
      initialValue: "3–6 MARCH 2026 · KLCC, MALAYSIA",
    }),
    defineField({
      name: "exhibitionBadge",
      title: "主办方 Logo / 横幅",
      type: "image",
      group: "exhibition",
      options: { hotspot: true },
      description: "留空则使用默认的 EFE 官方横幅图。",
    }),
    defineField({
      name: "exhibitionImages",
      title: "展会现场照片",
      type: "array",
      group: "exhibition",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "留空则使用默认的展会现场照片。",
    }),
    defineField({
      name: "address",
      title: "地址",
      type: "text",
      rows: 2,
      group: "contact",
      initialValue:
        "No.11B, Jalan Lingkaran Bentara 1, Pusat Komersial Bentara, 83300 Batu Pahat, Johor, Malaysia",
    }),
    defineField({ name: "officePhone", title: "办公电话", type: "string", group: "contact", initialValue: "+607-599 9017" }),
    defineField({ name: "mobilePhone", title: "手机", type: "string", group: "contact", initialValue: "+6012-306 2889" }),
    defineField({ name: "email", title: "邮箱", type: "string", group: "contact", initialValue: "enquirymegumi@gmail.com" }),
    defineField({
      name: "mapUrl",
      title: "Google Map 嵌入链接",
      type: "url",
      group: "contact",
    }),
  ],
  preview: {
    prepare() {
      return { title: "网站设置 Site Settings" };
    },
  },
});

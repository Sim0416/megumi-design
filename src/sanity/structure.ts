import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("内容 Content")
    .items([
      S.listItem()
        .title("网站设置 Site Settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.divider(),
      S.documentTypeListItem("service").title("服务 Services"),
      S.documentTypeListItem("project").title("作品 Portfolio"),
    ]);

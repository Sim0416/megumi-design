import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "sanity";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 font-body text-lg leading-relaxed text-paper-100/75 md:text-xl">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-gold-400">{children}</strong>
    ),
  },
};

export function PortableTextRenderer({
  value,
}: {
  value: PortableTextBlock[];
}) {
  return <PortableText value={value} components={components} />;
}

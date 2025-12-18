import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const prettyOptions = {
  theme: "github-dark-dimmed",
  keepBackground: true,
};

export const mdxOptions: any = {
  remarkPlugins: [remarkGfm, remarkMath],
  rehypePlugins: [
    [rehypePrettyCode, prettyOptions],
    [rehypeKatex],
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: "wrap",
        properties: {
          style: "color: inherit; text-decoration: none;",
        },
      },
    ],
  ],
};

export type MdxOptions = typeof mdxOptions;
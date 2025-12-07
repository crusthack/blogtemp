import { getPostData, getSortedPostsData } from "@/lib/posts";
import BlogPost from "@/components/BlogPost";
import PostToc from "@/components/PostToc";
import { MDXRemote } from "next-mdx-remote/rsc";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import CodeBlockCopyButton from "@/components/CodeBlockCopyButton";

import { TocItem, extractTocFromMarkdown } from "@/lib/extractToc";
import CategoryPage from "../page";
import CategorySidebar from "@/components/CategorySidebar";

const prettyOptions = {
  theme: "github-dark-dimmed",
  keepBackground: true,
};


export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export default async function Post({
  params,
}: {
  params: Promise<{ category: string, slug?: string }>;
}) {
  let { category, slug } = await params;
  slug = slug?.toLowerCase();
  console.log(category);
  const postData = getPostData(slug!);
  const toc: TocItem[] = extractTocFromMarkdown(postData.content);

  return (
    <div className="grid grid-cols-[1fr_800px_1fr] gap-8 w-full">
      <div className="flex justify-end"> <CategorySidebar category={category} /></div>

      {/* 중간 콘텐츠 */}
      <div className="w-full mx-auto">
        <BlogPost post={postData}>
          <MDXRemote
            source={postData.content}
            components={{
              pre: (props) => <CodeBlockCopyButton {...props} />,
            }}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMath],
                rehypePlugins: [
                  [rehypePrettyCode, prettyOptions],
                  rehypeKatex,
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
              },
            }}
          />
        </BlogPost>
      </div >

      {/* 오른쪽 TOC → 클라이언트 컴포넌트 */}
      <div className="flex justify-start">
        <PostToc toc={toc} />
      </div>

    </div>
  );
}

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
  const { category, slug } = await params;
  console.log(category);
  if(!slug)
  {
    return ("hello, world!!");
  }
  const postData = getPostData(slug);
  const toc: TocItem[] = extractTocFromMarkdown(postData.content);

  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] gap-8 w-full">
      <div></div>

      {/* 중간 콘텐츠 */}
      <div className="w-full mx-auto">
        <BlogPost title={postData.title} date={postData.date}>
          <MDXRemote
            source={postData.content}
            components={{
              pre: (props) => <CodeBlockCopyButton {...props} />,
            }}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMath],
                rehypePlugins: [
                  rehypePrettyCode,
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
      </div>

      {/* 오른쪽 TOC → 클라이언트 컴포넌트 */}
      <PostToc toc={toc} />
    </div>
  );
}

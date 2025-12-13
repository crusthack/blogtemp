import { getPostData, getPostDatac, getSortedPostsData } from "@/lib/posts";
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
import CategorySidebar from "@/components/CategorySidebar";

import type { Metadata } from "next";

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

export async function generateMetadata({
  params,
}: {                                                            
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const {slug} = await params;
  const post = await getPostData(slug);

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function Post({
  params,
}: {
  params: Promise<{ category: string, slug?: string }>;
}) {
  let { category, slug } = await params;
  console.log(category);
  const decodedCategory = typeof category === "string" ? decodeURIComponent(category).replace(/\+/g, " ").trim() : category;

  const postData = getPostDatac(decodedCategory!, slug!);
  if(postData === null){
    return <div>존재하지 않는 포스트입니다.</div>;
  }
  const toc: TocItem[] = extractTocFromMarkdown(postData.content);

  return (
    <div className="grid grid-cols-[1fr_1000px_1fr] gap-8 w-full">
      <div className="flex justify-end"> <CategorySidebar category={decodedCategory} /></div>

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

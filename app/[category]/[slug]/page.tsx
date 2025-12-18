import { getPostDatac, getSortedPostsData } from "@/lib/posts";
import BlogPost from "@/components/BlogPost";
import PostToc from "@/components/PostToc";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxOptions } from "@/lib/mdxOptions";
import CodeBlockCopyButton from "@/components/CodeBlockCopyButton";
import { TocItem, extractTocFromMarkdown } from "@/lib/extractToc";
import CategorySidebar from "@/components/CategorySidebar";
import type { Metadata } from "next";

// MDX plugins are provided via shared options

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
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const decodedCategory =
    typeof category === "string"
      ? decodeURIComponent(category).replace(/\+/g, " ").trim()
      : category;
  let post = getPostDatac(decodedCategory!, slug);

  if (!post) {
    post = getPostDatac("", "404");
  }

  return {
    title: post!.title,
    description: post!.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; slug?: string }>;
}) {
  const { category, slug } = await params;
  const decodedCategory =
    typeof category === "string"
      ? decodeURIComponent(category).replace(/\+/g, " ").trim()
      : category;

  let postData = getPostDatac(decodedCategory!, slug!) ?? getPostDatac("", "404");
  let toc: TocItem[] = [];

  toc = extractTocFromMarkdown(postData!.content);

  return (
    <div className="grid grid-cols-[1fr_1000px_1fr] gap-8 w-full">
      <div className="flex justify-end">
        <CategorySidebar category={decodedCategory} />
      </div>

      {/* 중간 콘텐츠 */}
      <div className="w-full mx-auto">
        <BlogPost post={postData!}>
          <MDXRemote
            source={postData!.content}
            components={{
              pre: (props) => <CodeBlockCopyButton {...props} />,
            }}
            options={{ mdxOptions }}
          />
        </BlogPost>
      </div>

      {/* 오른쪽 TOC → 클라이언트 컴포넌트 */}
      <div className="flex justify-start">
        <PostToc toc={toc} />
      </div>
    </div>
  );
}

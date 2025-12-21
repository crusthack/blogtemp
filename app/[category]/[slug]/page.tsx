import { getPostData, getSortedPostsData } from "@/lib/posts";
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
  let post = getPostData(decodedCategory!, slug);

  if (!post) {
    post = getPostData("", "404");
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

  let postData = getPostData(decodedCategory!, slug!) ?? getPostData("", "404");
  let toc: TocItem[] = [];

  toc = extractTocFromMarkdown(postData!.content);

  // Resolve relative media paths (e.g., "a.jpg") to content/images/<category>/<slug>/a.jpg
  const resolveMediaPath = (value: string | undefined) => {
    if (!value) return undefined;
    const v = String(value);
    // Keep absolute, protocol, and hash links untouched
    if (v.startsWith("/") || v.startsWith("http://") || v.startsWith("https://") || v.startsWith("#")) {
      return v;
    }
    // Map to our file-serving route
    return `/images/${encodeURIComponent(decodedCategory!)}/${encodeURIComponent(slug!)}/${v}`;
  };

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
              img: (props) => {
                const src = resolveMediaPath(props.src as any);
                if (!src) return null;
                return <img {...props} src={src} />;
              },
              a: (props: any) => {
                const href = resolveMediaPath(props.href);
                if (!href) return <span {...props} />; // render fallback without href
                return <a {...props} href={href} />;
              },
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

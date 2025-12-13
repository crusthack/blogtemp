import { getSortedPostsData } from "@/lib/posts";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    category: post.category,
  }));
}

export default async function Post({
  params,
}: {                                                            
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // 디코드: URL 인코딩(%20, + 등)을 공백으로 변환
  const decodedCategory = typeof category === "string" ? decodeURIComponent(category).replace(/\+/g, " ").trim() : category;

  // 모든 포스트 불러오기
  const posts = getSortedPostsData();

  // 해당 카테고리 포스트만 필터
  const filtered = posts
    .filter((post) => post.category === decodedCategory)
    .sort((a, b) => a.slug.localeCompare(b.slug)); // 🔥 slug 알파벳 순 정렬
    
  if (filtered.length === 0) {
    return <div>해당 카테고리에 글이 없습니다.</div>;
  }

  // 가장 앞글 slug
  const firstSlug = filtered[0].slug;

  // 자동 이동 (경로 안전 인코딩)
  redirect(`/${encodeURIComponent(decodedCategory)}/${firstSlug}`);
}

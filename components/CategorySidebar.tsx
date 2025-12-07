import Link from "next/link";
import { getPostsByCategory } from "@/lib/posts";

export default function CategorySidebar({ category }: { category: string }) {
  const posts = getPostsByCategory(category);

  return (
    <aside className="sticky top-20 space-y-2">
      <h2 className="font-bold text-lg mb-3 capitalize">{category}</h2>

      <ul className="space-y-1">
        {posts.map(post => (
          <li key={post.slug}>
            <Link
              href={`/${category}/${post.slug}`}
              className="block px-2 py-1 hover:bg-gray-200 rounded"
            >
              {post.title ?? post.slug}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

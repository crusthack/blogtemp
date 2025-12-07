// components/BlogPost.tsx
import { Post } from '@/lib/posts';
import React from 'react'

interface BlogPostProps {
  post: Post
  children: React.ReactNode
}

export default function BlogPost({ post, children }: BlogPostProps) {
  return (
    <article className="w-full bg-gray-100 p-4 rounded-md">

      {/* 제목/날짜 */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <time className="text-gray-500">{post.date}</time>

        <p className="mt-3 text-lg text-gray-600 leading-relaxed max-w-prose">
          {post.description}
        </p>
      </header>


      {/* 본문 전체 레이아웃 (flex + markdown-body) */}
      <div className="bg-gray-100">
        <div className="!bg-gray-100 p-6 rounded-md">

          {/* markdown 본문 */}
          <div className="markdown-body !bg-gray-100">
            {children}
          </div>

        </div>
      </div>

    </article>
  );
}

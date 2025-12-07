// components/BlogPost.tsx
import React from 'react'

interface BlogPostProps {
  title: string
  date: string
  children: React.ReactNode
}

export default function BlogPost({ title, date, children }: BlogPostProps) {
  return (
    <article className="w-full mx-auto bg-gray-100 p-4 rounded-md">

      {/* 제목/날짜 */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <time className="text-gray-500">{date}</time>
      </header>

      {/* 본문 전체 레이아웃 (flex + markdown-body) */}
      <div className="prose dark:prose-invert bg-gray-100">
        <div className="flex gap-8 !bg-gray-100 p-6 rounded-md">

          {/* markdown 본문 */}
          <div className="markdown-body !bg-gray-100">
            {children}
          </div>

        </div>
      </div>

    </article>
  );
}

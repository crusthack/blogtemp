// components/BlogPost.tsx
import React from 'react'

interface BlogPostProps {
  title: string
  date: string
  children: React.ReactNode
}

export default function BlogPost({ title, date, children }: BlogPostProps) {
  return (
    <article className="max-w-2xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <time className="text-gray-500">{date}</time>
      </header>
      
      <div className="prose dark:prose-invert">
        {children}
      </div>
    </article>
  )
}
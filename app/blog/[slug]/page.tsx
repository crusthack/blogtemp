//  `app/blog/[slug]/page.tsx`
import { getPostData, getSortedPostsData } from '@/lib/posts'
import BlogPost from '@/components/BlogPost'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkToc from 'remark-toc'
import rehypeHighlight from 'rehype-highlight'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'

import CodeBlockCopyButton from '@/components/CodeBlockCopyButton'

import { TocItem, extractTocFromMarkdown } from "@/lib/rehype-toc";
import rehypeAutolinkHeadings from 'rehype-autolink-headings'


export async function generateStaticParams() {
    const posts = getSortedPostsData()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const postData = getPostData(slug)
    const toc: TocItem[] = extractTocFromMarkdown(postData.content);

    return (
        <div className='flex'>
            <BlogPost title={postData.title} date={postData.date}>

                <div className="flex gap-8">

                    {/* 본문 */}
                    <div className="markdown-body">
                        <MDXRemote
                            source={postData.content}
                            components={{
                                pre: (props) => <CodeBlockCopyButton {...props} />,   // ★ 여기가 핵심!
                            }}
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [remarkGfm, remarkMath,
                                        [remarkToc, { heading: 'The Table', maxDepth: 2, parents: ['listItem', 'root'], skip: 'delta' }]],
                                    rehypePlugins: [
                                        rehypePrettyCode,
                                        rehypeKatex,
                                        rehypeSlug, // ① id 생성
                                        [
                                            rehypeAutolinkHeadings,
                                            {
                                                behavior: "append",
                                                properties: {
                                                    className: ["anchor-link"],
                                                },
                                                content() {
                                                    return {
                                                        type: "text",
                                                        value: " 🔗", // 아이콘(원하는 걸로 변경 가능)
                                                    };
                                                },
                                            },
                                        ],
                                    ]
                                },
                            }}
                        />
                    </div>

                    {/* 우측 TOC */}

                </div>
            </BlogPost>
            <aside className="w-64 sticky top-20 h-fit max-h-[80vh] overflow-auto">
                <h3 className="font-bold mb-4">목차</h3>
                <ul className="space-y-2">
                    {toc.map((item) => (
                        <li
                            key={item.id}
                            style={{ paddingLeft: (item.level - 1) * 16 }}
                        >
                            <a className="text-sm hover:underline" href={`#${item.id}`}>
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
}
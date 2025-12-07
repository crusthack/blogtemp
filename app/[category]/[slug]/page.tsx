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
        category: post.category,
        slug: post.slug,
    }))
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const postData = getPostData(slug)
    const toc: TocItem[] = extractTocFromMarkdown(postData.content);

    return (
        <div className="grid grid-cols-[1fr_2fr_1fr] gap-8 w-full">

            {/* 왼쪽 빈 공간 */}
            <div>

            </div>

            {/* 가운데 컨텐츠 */}
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

            {/* 오른쪽 TOC */}
            <aside className="sticky top-20 h-fit max-h-[80vh] overflow-auto">
                <h3 className="font-bold mb-4">목차</h3>
                <ul className="space-y-2">
                    {toc.map((item) => (
                        <li key={item.id} style={{ paddingLeft: (item.level - 1) * 16 }}>
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
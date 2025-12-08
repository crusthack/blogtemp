import { getPostDatac, getSortedPostsData } from '@/lib/posts'
import BlogPost from '@/components/BlogPost'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'

import CodeBlockCopyButton from '@/components/CodeBlockCopyButton'

import { TocItem, extractTocFromMarkdown } from "@/lib/extractToc";
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export default async function Post() {
    const postData = getPostDatac("", 'index')
    const toc: TocItem[] = extractTocFromMarkdown(postData.content);

    return (
        <div className="grid grid-cols-[1fr_2fr_1fr] gap-8 w-full">

            {/* 왼쪽 빈 공간 */}
            <div>

            </div>

            {/* 가운데 컨텐츠 */}
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

            <div/>

        </div>

    );
}
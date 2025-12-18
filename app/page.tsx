import { getPostData } from '@/lib/posts'
import BlogPost from '@/components/BlogPost'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxOptions } from '@/lib/mdxOptions'
import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import CodeBlockCopyButton from '@/components/CodeBlockCopyButton'

// MDX plugins are provided via shared options

export default async function Post() {
    const postData = getPostData("", 'index')
    if (postData === null) {
        return <div>존재하지 않는 포스트입니다.</div>;
    }

    return (
        <div className="grid grid-cols-[1fr_1000px_1fr] gap-8 w-full">

            {/* 왼쪽 사이드 컨텐츠 */}
            <div className="flex justify-end">
                <LeftSidebar />
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
                            mdxOptions,
                        }}
                    />
                </BlogPost>
            </div>

            {/* 오른쪽 사이드 컨텐츠 */}
            <div className="flex justify-start">
                <RightSidebar />
            </div>

        </div>

    );
}
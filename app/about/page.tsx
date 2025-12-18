import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxOptions } from "@/lib/mdxOptions";
import BlogPost from "@/components/BlogPost";
import CodeBlockCopyButton from "@/components/CodeBlockCopyButton";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import type { Metadata } from "next";
import { getPostData } from "@/lib/posts";

export async function generateMetadata(): Promise<Metadata> {
    const post = getPostData("", 'about')
    return {
        title: post?.title ?? "소개",
        description: post?.description ?? "소개 페이지",
    };
}

export default async function AboutPage() {
    const post = getPostData("", 'about')
    if (post === null) {
        return <div>존재하지 않는 포스트입니다.</div>;
    }

    return (
        <main className="grid grid-cols-[1fr_1000px_1fr] gap-8 w-full">
            <div className="flex justify-end">
                <LeftSidebar />
            </div>
            <section className="w-full mx-auto">
                <BlogPost post={post as any}>
                    <MDXRemote
                        source={post.content}
                        components={{
                            pre: (props) => <CodeBlockCopyButton {...props} />,
                        }}
                        options={{ mdxOptions }}
                    />
                </BlogPost>
            </section>
            <div className="flex justify-start">
                <RightSidebar />
            </div>
        </main>
    );
}

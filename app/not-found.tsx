import { getPostData } from "@/lib/posts";
import BlogPost from "@/components/BlogPost";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxOptions } from "@/lib/mdxOptions";
import CodeBlockCopyButton from "@/components/CodeBlockCopyButton";
import { TocItem, extractTocFromMarkdown } from "@/lib/extractToc";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

export default function NotFound() {
    let postData = getPostData("", "404");
    let toc: TocItem[] = [];

    toc = extractTocFromMarkdown(postData!.content);

    return (
        <div className="grid grid-cols-[1fr_1000px_1fr] gap-8 w-full">
            <div className="flex justify-end">
                <LeftSidebar />
            </div>

            {/* 중간 콘텐츠 */}
            <div className="w-full mx-auto">
                <BlogPost post={postData!}>
                    <MDXRemote
                        source={postData!.content}
                        components={{
                            pre: (props) => <CodeBlockCopyButton {...props} />,
                        }}
                        options={{ mdxOptions }}
                    />
                </BlogPost>
            </div>

            {/* 오른쪽 TOC → 클라이언트 컴포넌트 */}
            <div className="flex justify-start">
                <RightSidebar />
            </div>
        </div>
    );
}
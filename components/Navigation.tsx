"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Navi({ categories }: { categories: string[] }) {
    const [open, setOpen] = useState(false);

    return (
        <nav className="relative w-full h-16 bg-transparent grid grid-cols-[1fr_1000px_1fr]">

            <div></div>

            {/* 가운데 네비 전체 */}
            <div className="flex w-full items-center justify-between">

                <div className="flex items-center justify-start px-6 gap-6">

                    <Link href="/" className="flex text-xl items-center font-bold hover:opacity-70 transition">
                        <img
                            src="https://avatars.githubusercontent.com/u/161662653?v=4"
                            alt="avatar"
                            className="w-12 h-12 rounded-full"
                        />
                        <p>Main</p>
                    </Link>
                    <Image
                        src="/images/Web/catbattle/a.jpg"
                        alt="logo"
                        width={100}
                        height={40}
                        className="object-contain"
                    />
                </div>

                <div className="flex items-center justify-end px-6 gap-2">

                    <Link
                        href="/about"
                        className="px-3 py-2 hover:bg-gray-200 rounded transition"
                    >
                        소개
                    </Link>

                    {/* 문서 드롭다운 */}
                    <div
                        className="relative"
                        onPointerEnter={() => setOpen(true)}
                        onPointerLeave={() => setOpen(false)}
                    >
                        <Link
                            href="/Common"
                            className="px-3 py-2 hover:bg-gray-200 rounded transition"
                        >
                            문서
                        </Link>

                        {open && (
                            <div
                                className="absolute mt-0 left-0 min-w-[12rem] bg-white shadow-lg rounded-md border p-2 z-50"
                            >
                                {categories.map((cat) => (
                                    <Link
                                        key={cat}
                                        href={`/${encodeURIComponent(cat)}`}
                                        className="block px-3 py-2 hover:bg-gray-100 w-full rounded"
                                    >
                                        {cat}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 카테고리 전용 링크: Project / Journal */}
                    <Link
                        href={`/${encodeURIComponent('Project')}`}
                        className="px-3 py-2 hover:bg-gray-200 rounded transition"
                    >
                        프로젝트
                    </Link>

                    <Link
                        href={`/${encodeURIComponent('Journal')}`}
                        className="px-3 py-2 hover:bg-gray-200 rounded transition"
                    >
                        일지
                    </Link>

                    {/* 일지 링크 제거 */}

                </div>
            </div>



            <div></div>

        </nav>
    );
}

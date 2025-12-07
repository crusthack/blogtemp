"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navi({ categories }: { categories: string[] }) {
    const [open, setOpen] = useState(false);

    return (
        <nav className="relative w-full h-16 bg-transparent grid grid-cols-[1fr_2fr_1fr]">

            <div></div>

            {/* 가운데 네비 전체 */}
            <div className="flex items-center justify-start px-6 gap-6">

                <Link href="/" className="text-xl font-bold hover:opacity-70 transition">
                    MAIN
                </Link>

                <Link href="/about" className="hover:opacity-70 transition">
                    소개
                </Link>

                {/* ⭐ 문서 버튼 + 드롭다운이 모두 포함되는 relative wrapper */}
                <div
                    className="relative"
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(true)}
                >
                    <button className="hover:opacity-70 transition">
                        문서
                    </button>

                    {/* ⭐ relative 기준으로 정렬된 absolute dropdown */}
                    {open && (
                        <div
                            className="absolute top-full left-0 mt-1
                                       w-40 bg-white shadow-lg rounded-md border p-2 z-50"
                        >
                            {categories.map((cat) => (
                                <Link
                                    key={cat}
                                    href={`/blog/${cat}`}
                                    className="block px-3 py-2 hover:bg-gray-100 rounded"
                                >
                                    {cat}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <Link href="/journal" className="hover:opacity-70 transition">
                    일지
                </Link>

            </div>

            <div></div>

        </nav>
    );
}

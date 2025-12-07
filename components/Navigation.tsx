"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navi({ categories }: { categories: string[] }) {
    const [open, setOpen] = useState(false);

    return (
        <nav className="relative w-full h-16 bg-transparent grid grid-cols-[1fr_2fr_1fr]">

            <div></div>

            {/* 가운데 네비 전체 */}
            <div className="flex w-full items-center justify-between px-6">

            <div className="flex items-center justify-start px-6 gap-6">

                <Link href="/" className="text-xl font-bold hover:opacity-70 transition">
                    MAIN
                </Link>
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
                        <button className="px-3 py-2 hover:bg-gray-200 rounded transition">
                            문서
                        </button>

                        {open && (
                            <div
                                className="absolute top-full left-0 mt-0
                                       w-40 bg-white shadow-lg rounded-md border p-2 z-50"
                            >
                                {categories.map((cat) => (
                                    <Link
                                        key={cat}
                                        href={`/${cat}`}
                                        className="block px-3 py-2 hover:bg-gray-100 rounded"
                                    >
                                        {cat}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link
                        href="/journal"
                        className="px-3 py-2 hover:bg-gray-200 rounded transition"
                    >
                        일지
                    </Link>

                </div>
            </div>



            <div></div>

        </nav>
    );
}

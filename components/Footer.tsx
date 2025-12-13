export default function Footer() {
    return (
        <footer className="w-full border-t mt-12 py-6 text-sm text-gray-600 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <p className="font-semibold">Blog</p>
                    <p className="text-xs text-gray-500">생각과 기록을 남기는 공간 · 업데이트 불규칙</p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div>
                        <p className="font-medium">사이트</p>
                        <nav className="text-xs text-gray-600">
                            <a className="hover:underline mr-3" href="/">홈</a>
                            <a className="hover:underline mr-3" href="/about">소개</a>
                            <a className="hover:underline" href="/journal">일지</a>
                        </nav>
                    </div>

                    <div>
                        <p className="font-medium">연락</p>
                        <p className="text-xs text-gray-600">email: hello@example.com</p>
                    </div>
                </div>

                <div className="text-xs text-gray-500">© {new Date().getFullYear()} Monkey. All rights reserved.</div>
            </div>
        </footer>
    );
}
"use client";

import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from "react";

const IconCopy = () => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
);

const IconCheck = () => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const CodeBlockCopyButton = ({
    className = "",
    children,
    ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const preRef = useRef<HTMLPreElement>(null);

    const handleClickCopy = async () => {
        const code = preRef.current?.textContent;

        if (code) {
            setIsLoading(true);
            await navigator.clipboard.writeText(code);
            setIsLoading(false);
            setIsCopied(true);

            setTimeout(() => setIsCopied(false), 1500);
        }
    };

    return (
        <div className="relative">
            <button
                disabled={isCopied || isLoading}
                aria-label={isCopied ? "Copied!" : "Copy code"}
                onClick={handleClickCopy}
                className="
                    absolute right-3 top-3
                    flex items-center gap-1
                    rounded-md 
                    bg-[rgba(0,0,0,0.6)]
                    px-2 py-1
                    text-sm
                    text-white
                    hover:bg-[rgba(0,0,0,0.8)]
                    transition
                    border border-white/10
                "
                style={{ height: "28px" }}
            >
                <span className="w-4 h-4 flex items-center justify-center">
                    {isCopied ? <IconCheck /> : <IconCopy />}
                </span>

                <span className="text-xs">
                    {isCopied ? "Copied!" : "Copy"}
                </span>
            </button>

            <pre ref={preRef} {...props} className={className}>
                {children}
            </pre>
        </div>
    );
};

export default CodeBlockCopyButton;

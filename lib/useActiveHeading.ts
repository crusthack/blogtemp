"use client";

import { useState, useEffect } from "react";

export function useActiveHeading() {
    const [activeH1, setActiveH1] = useState<string | null>(null);

    useEffect(() => {
        const headings = Array.from(document.querySelectorAll("h1"));

        const handleScroll = () => {
            const scrollTop = window.scrollY + 120;

            let current = null;

            for (const el of headings) {
                const top = el.getBoundingClientRect().top + window.scrollY;
                if (top <= scrollTop) current = el.id;
            }

            setActiveH1(current);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return activeH1;
}

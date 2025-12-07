import { visit } from "unist-util-visit";
import type { Root } from "hast";

export interface TocItem {
  level: number;
  text: string;
  id: string;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w가-힣 ]+/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function extractTocFromMarkdown(content: string) {
  const toc: TocItem[] = [];

  const headingRegex = /^(#{1,6})\s+(.*)$/gm;
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;  // # 개수
    const text = match[2].trim();   // 제목
    const id = slugify(text);       // ID 만들기 (직접 구현)

    toc.push({ level, text, id });
  }

  return toc;
}

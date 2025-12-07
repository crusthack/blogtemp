import {slug} from "github-slugger"

export interface TocItem {
  level: number;
  text: string;
  id: string;
}

export function extractTocFromMarkdown(content: string) {
  const toc: TocItem[] = [];

  const headingRegex = /^(#{1,6})\s+(.*)$/gm;
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;  // # 개수
    const text = match[2].trim();   // 제목
    const id = slug(text, false);

    toc.push({ level, text, id });
  }

  return toc;
}

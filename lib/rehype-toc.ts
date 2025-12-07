import { slug } from "github-slugger";

export interface TocItem {
  level: number;
  text: string;
  id: string;

  parentId: string | null;
  topLevelId: string | null;
}

export function extractTocFromMarkdown(content: string): TocItem[] {
  const toc: TocItem[] = [];

  const headingRegex = /^(#{1,6})\s+(.*)$/gm;
  let match;

  const stack: TocItem[] = []; // heading 계층을 추적

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slug(text, false);

    const item: TocItem = {
      level,
      text,
      id,
      parentId: null,
      topLevelId: null,
    };

    // 자신보다 레벨이 같거나 낮은 heading은 stack에서 제거
    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    // 부모 설정
    if (stack.length > 0) {
      item.parentId = stack[stack.length - 1].id;
      item.topLevelId = stack[0].id; // H1의 id
    } else {
      item.topLevelId = item.id; // 자신이 H1
    }

    stack.push(item);
    toc.push(item);
  }

  return toc;
}

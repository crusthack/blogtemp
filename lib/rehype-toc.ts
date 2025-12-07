import { visit } from "unist-util-visit";
import type { Root } from "hast";

export interface TocItem {
  level: number;
  text: string;
  id: string;
}

export function rehypeToc(toc: TocItem[]) {
  const usedIds = new Map<string, number>();  // ← 추가

  return () => (tree: Root) => {
    visit(tree, "element", (node: any) => {
      if (/^h[1-6]$/.test(node.tagName)) {
        const text =
          node.children
            ?.filter((c: any) => c.type === "text")
            ?.map((c: any) => c.value)
            .join(" ") ?? "";

        let id = String(node.properties?.id ?? "");

        // 🔥 같은 id가 이미 나오면 suffix 추가
        if (usedIds.has(id)) {
          const count = usedIds.get(id)! + 1;
          usedIds.set(id, count);
          id = `${id}-${count}`;
        } else {
          usedIds.set(id, 0);
        }

        toc.push({
          level: Number(node.tagName.slice(1)),
          text,
          id,
        });
      }
    });
  };
}

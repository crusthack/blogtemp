"use client";

import { TocItem } from "@/lib/extractToc";
import { useActiveHeading } from "@/lib/useActiveHeading"
export default function PostToc({ toc }: { toc: TocItem[] }) {
  const activeId = useActiveHeading();
  const activeItem = toc.find(t => t.id === activeId) || null;
  const parentId = activeItem?.parentId || null;
  const parentItem = parentId ? toc.find(t => t.id === parentId) || null : null;
  const grandParentId = parentItem?.parentId || null;
  const siblingIds = parentItem
    ? toc.filter(t => t.level === parentItem.level && t.parentId === grandParentId).map(t => t.id)
    : [];

  // Collect all ancestor ids (parent, grandparent, ... up to top)
  const ancestorIds = new Set<string>();
  let cur = activeItem;
  while (cur && cur.parentId) {
    ancestorIds.add(cur.parentId);
    cur = toc.find(t => t.id === cur!.parentId) || null;
  }

  return (
    <aside className="sticky top-20 h-fit max-h-[80vh] overflow-auto">
      <h3 className="font-bold mb-4">목차</h3>

      <ul className="space-y-2">
        {toc.map((item) => {
          const isActive = item.id === activeId;
          const isH1 = item.level === 1;

          let shouldShow = isH1;
          if (activeItem) {
            if (activeItem.level === 1) {
              // If H1 is active, show its children as well
              shouldShow = shouldShow || item.parentId === activeItem.id || isActive;
            } else {
              // For deeper levels: show active item, its parent, the parent's children (siblings),
              // and also the parent's siblings (but NOT their children).
              const pid = activeItem.parentId;
              const isParentSibling = siblingIds.includes(item.id);

              shouldShow =
                shouldShow ||
                isActive ||
                item.id === pid ||
                item.parentId === pid ||
                // Always show direct children of active item
                item.parentId === activeItem.id ||
                isParentSibling ||
                ancestorIds.has(item.id);
            }
          }

          if (!shouldShow) return null;

          return (
            <li key={item.id} style={{ paddingLeft: (item.level - 1) * 16 }}>
              <a
                href={`#${item.id}`}
                className={`text-sm hover:underline${isActive ? " font-bold text-blue-500" : " text-gray-700"}`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

// "use client";

// import { useActiveHeading } from "@/lib/useActiveHeading";
// import { TocItem } from "@/lib/extractToc";

// export default function PostToc({ toc }: { toc: TocItem[] }) {
//     const activeH1 = useActiveHeading(); // ✔ 여기서 호출

//     return (
//         <aside className="sticky top-20 h-fit max-h-[80vh] overflow-auto">
//             <h3 className="font-bold mb-4">목차</h3>

//             <ul className="space-y-2">
//                 {toc
//                     .filter(item => item.topLevelId === activeH1)
//                     .map(item => (
//                         <li
//                             key={item.id}
//                             style={{ paddingLeft: (item.level - 1) * 16 }}
//                         >
//                             <a className="text-sm hover:underline" href={`#${item.id}`}>
//                                 {item.text}
//                             </a>
//                         </li>
//                     ))}
//             </ul>
//         </aside>
//     );
// }

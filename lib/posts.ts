// lib/posts.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  date: string
  category: string
  title: string
  description: string
  content: string
}

function walkDir(dir: string, fileList: string[] = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, fileList); // 재귀
    } else if (file.endsWith(".mdx")) {
      fileList.push(fullPath);
    }
  });

  return fileList;
}


export function getAllCategories() {
  const dirs = fs.readdirSync(postsDirectory).filter((item) => {
    const fullPath = path.join(postsDirectory, item);
    return fs.statSync(fullPath).isDirectory();
  });

  return dirs;
}


export function getSortedPostsData(): Omit<Post, "content">[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const filePaths = walkDir(postsDirectory); // 하위 폴더 포함 모든 MDX 파일
  const allPostsData = filePaths.map((fullPath) => {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    const slug = path.basename(fullPath).replace(/\.mdx$/, "");
    const category = path.basename(path.dirname(fullPath)); // 바로 상위 폴더 이름

    return {
      slug,
      category: data.category || category, // front-matter 없으면 폴더명 사용
      title: data.title,
      date: data.date,
      description: data.description,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}


export function getPostData(slug: string): Post {
  const filePaths = walkDir(postsDirectory);

  const fullPath = filePaths.find((p) =>
    p.endsWith(`${slug}.mdx`)
  );

  if (!fullPath) {
    throw new Error(`Post not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const category = path.basename(path.dirname(fullPath));

  return {
    slug,
    category: data.category || category,
    title: data.title,
    date: data.date,
    description: data.description,
    content,
  };
}

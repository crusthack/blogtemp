import createMDX from '@next/mdx'
import { NextConfig } from 'next';
 
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}
 
const withMDX = createMDX({
  options: {
    remarkPlugins: [
    ],
    rehypePlugins: [
    ],
  },
})
 
export default withMDX(nextConfig)
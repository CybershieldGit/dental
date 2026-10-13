import React from "react";
import { blogPosts as fallbackPosts, BlogPost } from "@/data/blog";
import BlogListClient from "./BlogListClient";

export const dynamic = "force-dynamic";

async function getLiveBlogs(): Promise<BlogPost[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5005";
  try {
    const res = await fetch(`${apiUrl}/api/blogs?site=dental`, {
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.length > 0) {
        return json.data;
      }
    }
  } catch (err) {}
  return fallbackPosts;
}

export default async function BlogPage() {
  const posts = await getLiveBlogs();
  return <BlogListClient posts={posts} />;
}

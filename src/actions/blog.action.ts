"use server";

import { BlogData, blogServices } from "@/services/blog.services";
import { updateTag } from "next/cache";

export const getPosts = async () => {
  return await blogServices.getBlogPosts();
};

export const createBlogPost = async (data: BlogData) => {
  const res = await blogServices.createBlogPost(data);
  updateTag("blogPost");
  return res;
};

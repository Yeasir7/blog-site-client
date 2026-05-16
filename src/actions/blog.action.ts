"use server";

import { blogServices } from "@/services/blog.services";

export const getPosts = async () => {
  return await blogServices.getBlogPosts();
};

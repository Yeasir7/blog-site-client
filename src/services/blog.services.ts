import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface getBlogParams {
  isFeatured?: boolean;
  search?: string,
}
interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}
export interface BlogData {
    title : string,
    content : string,
    tags ?: string[]
}

export const blogServices = {
  getBlogPosts: async function (
    params?: getBlogParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/post`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      config.next ={...config.next, tags: ["blogPost"]}

      const res = await fetch(url.toString(), config);

      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {
      console.error("Backend fetch failed:", error);
      return { data: null, error: { message: "something went wrong" } };
    }
  },
  getSinglePost: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/post/${id}`);
      const data = await res.json();

      return { data: data, err: null };
    } catch (err) {
      console.log(err);
      return { data: null, error: { message: "something went wrong" } };
    }
  },
  createBlogPost : async(blogData : BlogData) =>{
    try{
        const cookieStore = await cookies()

        const res = await fetch(`${API_URL}/post`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Cookie: cookieStore.toString(),
          },
          body: JSON.stringify(blogData),
        });

        const data = await res.json()

        return { data: data, error: null };
    }catch(err){
        console.log(err);
        return {data : null, error: "something went wrong"}
    }
  }
};

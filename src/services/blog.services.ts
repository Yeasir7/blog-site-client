import { env } from "@/env";

const API_URL = env.API_URL;

interface getBlogParams {
  isFeatured: boolean;
}
interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
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
};

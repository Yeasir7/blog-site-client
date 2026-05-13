import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;

export const userServices = {
  getSession: async () => {
    try {
      const cookieStore = await cookies();

      // console.log(cookieStore.toString());

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          cookie: cookieStore.toString(),
        },
      });

      const session = await res.json();

      return { data: session, error: null };
    } catch (error) {
      console.log("error", error);
      return { data: null, error: error };
    }
  },
};

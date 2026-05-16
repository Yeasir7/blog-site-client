"use client";

import { getPosts } from "@/actions/blog.action";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [data, setData] = useState();
  console.log(data);

  useEffect(() => {
    (async () => {
      const { data } = await getPosts();
      setData(data);
    })();
  }, []);

  return (
    <div>
      <h1>This is about page components</h1>
    </div>
  );
}

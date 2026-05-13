import { blogServices } from "@/services/blog.services";
import HomePageCard from "@/components/modules/homepage/hompageCard";

export default async function Home() {
  const { data } = await blogServices.getBlogPosts(
    {
      isFeatured: false,
    },
    {
      cache: "no-store",
    },
  );

  console.log(data);

  const postsArray = data?.data || [];

  return (
    <main>
      <HomePageCard posts={postsArray} />
    </main>
  );
}

import CreateBlogPageFromClient from "@/components/modules/user/createBlog/createBlogFromClient";
// import CreateBlogPageFromServer from "@/components/modules/user/createBlog/createBlogFromServer";
import { blogServices } from "@/services/blog.services";
import { BlogPost } from "@/types"

export default async function CreateBlogPage() {
  const {data} = await blogServices.getBlogPosts({},{cache: "no-store"})

  return (
    <div>
      <CreateBlogPageFromClient></CreateBlogPageFromClient>
      {/* <CreateBlogPageFromServer></CreateBlogPageFromServer> */}
      {data.data.map((item: BlogPost)=>(
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";
const API_URL = env.API_URL

export default function CreateBlogPageFromServer() {
  const createBlog = async (FormData: FormData) => {
    "use server";

    const cookieStore = await cookies()

    const title = FormData.get("title") as string;
    const content = FormData.get("content") as string;
    const tags = FormData.get("tags") as string;

    const blogData = {
      title,
      content,
      tags: tags.split(",").map(item=>item.trim()).filter(item => item !== ""),
    };
    const res = await fetch(`${API_URL}/post`,{
        method : "POST",
        headers : {
            "content-type" : "application/json",
            Cookie : cookieStore.toString()
        },
        body : JSON.stringify(blogData)
    });
    if(res.ok){
        updateTag("blogPost");
    }
  };
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Blog</CardTitle>
        <CardDescription>Express your thinking here</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="blog-form" action={createBlog}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder="Blog Title"
                required
              ></Input>
            </Field>
            <Field>
              <FieldLabel htmlFor="content">Title</FieldLabel>
              <Textarea
                id="content"
                name="content"
                placeholder="write your blog"
                required
              ></Textarea>
            </Field>
            <Field>
              <FieldLabel htmlFor="tags">Tags (comma separated)</FieldLabel>
              <Input id="tags" name="tags" placeholder="nextjs, web"></Input>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button form="blog-form" type="submit" className="w-full">
          submit
        </Button>
      </CardFooter>
    </Card>
  );
}

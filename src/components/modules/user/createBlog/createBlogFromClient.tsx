"use client";

import { createBlogPost } from "@/actions/blog.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import {z} from "zod"
const blogSchema = z.object({
    title : z.string().min(3, "please insert three word").max(200, "please stop"),
    content: z.string().min(10, "at least 10 ").max(5000, "please stop and go home"),
    tags: z.string()
})

export default function CreateBlogPageFromClient() {
  const form = useForm({
    defaultValues: {
        title : "",
        content : "",
        tags : ""
    },
    validators: {
        onSubmit: blogSchema
    }, 
    onSubmit : async({value})=>{
        const toastId = toast.loading("creating user")

        const blogData = {
            ...value,
            tags: value.tags.split(",").map((item)=> item.trim()).filter((item)=> item !=="")
        }
        console.log(blogData);
        try{
            const res = await createBlogPost(blogData)
            console.log(res);

            toast.success("post created", {id:toastId})
        }
        catch(err){
            console.log(err);
            toast.error("something went wrong", {id:toastId})
        }
    }
  });
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>create a post</CardTitle>
        <CardDescription>Express your thinking here</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="blog-post"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="title"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Blog Title"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="content"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                    <Textarea
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Blog Title"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="tags"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Tags (comma separated)</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="nextjs, web"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button form="blog-post" type="submit" className="w-full">
          submit
        </Button>
      </CardFooter>
    </Card>
  );
}

import { blogServices } from "@/services/blog.services";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Calendar, Eye, MessageSquare } from "lucide-react";
import { BlogPost } from "@/types";

export async function generateStaticParams() {
  const { data } = await blogServices.getBlogPosts();

  return data?.data?.map((blog : BlogPost) => ({ id: blog.id })).splice(0, 3);
}

export default async function SinglePostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Await the params (Next.js 15 requirement)
  const { id } = await params;

  // 2. Fetch the specific post
  const { data, error } = await blogServices.getSinglePost(id);
  console.log(data);

  // Handle errors or missing posts
  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-destructive mb-4">
          Post not found
        </h1>
        <Button asChild variant="outline">
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    );
  }

  // Handle nested backend data structure safely
  const post = data.data || data;

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button */}
      <Button
        asChild
        variant="ghost"
        className="mb-6 -ml-4 text-muted-foreground"
      >
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all posts
        </Link>
      </Button>

      {/* The Main Post Card */}
      <Card className="border-none shadow-none md:border md:shadow-sm">
        <CardHeader className="space-y-6">
          <CardTitle className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tighter">
            {post.title}
          </CardTitle>

          {/* Post Metadata (Date, Views, Comments) */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{post.views} views</span>
            </div>

            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{post._count?.comment || 0} comments</span>
            </div>
          </div>
        </CardHeader>

        <Separator className="my-4" />

        <CardContent className="pt-6">
          {/* Blog Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none text-lg leading-relaxed">
            {post.content}
          </div>
        </CardContent>

        <CardFooter className="flex-col items-start gap-4 pt-8">
          {/* Tags Section */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-sm px-3 py-1"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </CardFooter>
      </Card>
    </main>
  );
}

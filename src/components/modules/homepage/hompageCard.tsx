import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

// 1. Accept 'posts' as a prop from the parent page
export default function HomePageCard({ posts }: { posts: any[] }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Latest Blog Posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <Card key={post.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">{post.title}</CardTitle>
              <CardDescription>
                Published on: {new Date(post.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground line-clamp-3">
                {post.content}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/posts/${post.id}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Show a message if the database is completely empty */}
      {posts.length === 0 && (
        <p className="text-center text-muted-foreground mt-10">
          No posts found. Start writing!
        </p>
      )}
    </div>
  );
}

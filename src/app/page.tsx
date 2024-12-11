import { graphqlClient } from "@/lib/graphql-client";
import { GET_ALL_POSTS } from "@/lib/queries";
import { Post } from "@/types/post";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";

async function getPosts(): Promise<Post[]> {
  try {
    const { posts } = await graphqlClient.request(GET_ALL_POSTS);
    return posts.nodes;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {post.featuredImage && (
              <div className="relative h-48">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                <Link
                  href={`/posts/${post.slug}`}
                  className="hover:text-blue-600"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                {format(new Date(post.date), "MMMM dd, yyyy")}
              </p>
              <div
                className="text-gray-700 text-sm"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

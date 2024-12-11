import { graphqlClient } from "@/lib/graphql-client";
import { GET_POST_BY_SLUG, GET_ALL_POSTS } from "@/lib/queries";
import { Post } from "@/types/post";
import { format } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

// Generate static params for all posts
export async function generateStaticParams() {
  const { posts } = await graphqlClient.request(GET_ALL_POSTS);
  return posts.nodes.map((post: Post) => ({
    slug: post.slug,
  }));
}

async function getPost(slug: string): Promise<Post> {
  try {
    const { post } = await graphqlClient.request(GET_POST_BY_SLUG, { slug });
    if (!post) {
      notFound();
    }
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    notFound();
  }
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        {post.featuredImage && (
          <div className="relative h-64 md:h-96 mb-8">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-8">
          {format(new Date(post.date), "MMMM dd, yyyy")}
        </p>
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}

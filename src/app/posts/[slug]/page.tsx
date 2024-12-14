import { getPost } from "@/lib/api";
// import { GET_POST_BY_SLUG } from "@/lib/queries";
import { Post } from "@/types/post";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AuthorCard from "@/components/author-card";
import CommentsSection from "@/components/comment-section";

interface Props {
  params: {
    slug: string;
  };
}

async function getSingle(slug: string): Promise<Post> {
  try {
    const post = await getPost(slug);
    // const { post } = await serverClient.request(GET_POST_BY_SLUG, { slug });
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
  const post = await getSingle(params.slug);

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        {post.featuredImage?.node && (
          <div className="relative h-64 md:h-96 mb-8">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            {post.author?.node && (
              <div className="flex items-center gap-2">
                {post.author.node.avatar?.url && (
                  <Image
                    src={post.author.node.avatar.url}
                    alt={post.author.node.name || "Author"}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <span>{post.author.node.name}</span>
              </div>
            )}
            <span>•</span>
            <time>{format(new Date(post.date), "MMMM dd, yyyy")}</time>
          </div>
        </header>

        {/* Categories and Tags */}
        <div className="mb-8">
          {post.categories?.nodes && post.categories.nodes.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.nodes.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}

          {post.tags?.nodes && post.tags.nodes.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.nodes.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/tag/${tag.slug}`}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Post Content */}
        <div
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Author Card */}
        {post.author?.node && <AuthorCard author={post.author.node} />}

        {/* Comments Section */}
        <CommentsSection
          postId={post.id}
          initialComments={post.comments?.nodes || []}
        />
      </article>
    </main>
  );
}

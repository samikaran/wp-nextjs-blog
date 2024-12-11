import { Post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

interface Props {
  posts: Post[];
}

export default function PostGrid({ posts }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {post.featuredImage?.node && (
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
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <span>{format(new Date(post.date), "MMMM dd, yyyy")}</span>
              <span>•</span>
              <span>{post.commentCount || 0} comments</span>
            </div>
            {post.author?.node && (
              <div className="flex items-center gap-2 mb-3">
                {post.author.node.avatar?.url && (
                  <Image
                    src={post.author.node.avatar.url}
                    alt={post.author.node.name || "Author"}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}
                <span className="text-sm">{post.author.node.name}</span>
              </div>
            )}
            <div
              className="text-gray-700 text-sm mb-3"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
            {post.categories?.nodes && post.categories.nodes.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.categories.nodes.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

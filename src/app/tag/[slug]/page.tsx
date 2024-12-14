import { getTagData } from "@/lib/api";
import PostGrid from "@/components/post-grid";
import Pagination from "@/components/pagination";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
  searchParams: {
    after?: string;
  };
}

export default async function TagPage({ params, searchParams }: Props) {
  const tag = await getTagData(params.slug, searchParams.after);

  if (!tag) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Posts tagged with: {tag.name}</h1>

      {tag.posts.nodes.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-600">
            No posts found with this tag
          </h2>
          <p className="mt-2 text-gray-500">
            Try checking other tags or browse our categories
          </p>
        </div>
      ) : (
        <>
          <PostGrid posts={tag.posts.nodes} />
          {tag.posts.pageInfo.hasNextPage && (
            <Pagination
              hasNextPage={tag.posts.pageInfo.hasNextPage}
              endCursor={tag.posts.pageInfo.endCursor}
            />
          )}
        </>
      )}
    </div>
  );
}

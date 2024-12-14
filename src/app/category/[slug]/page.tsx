import { getCategoryData } from "@/lib/api";
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

export default async function CategoryPage({ params, searchParams }: Props) {
  const category = await getCategoryData(params.slug, searchParams.after);

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Category: {category.name}</h1>

      {category.posts.nodes.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-600">
            No posts found in this category
          </h2>
          <p className="mt-2 text-gray-500">Check back later for new content</p>
        </div>
      ) : (
        <>
          <PostGrid posts={category.posts.nodes} />
          {category.posts.pageInfo.hasNextPage && (
            <Pagination
              hasNextPage={category.posts.pageInfo.hasNextPage}
              endCursor={category.posts.pageInfo.endCursor}
            />
          )}
        </>
      )}
    </div>
  );
}

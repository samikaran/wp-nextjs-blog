import { graphqlClient } from "@/lib/graphql-client";
import { GET_ALL_POSTS } from "@/lib/queries";
import PostGrid from "@/components/post-grid";
import Pagination from "@/components/pagination";

interface Props {
  params: {
    slug: string;
  };
  searchParams: {
    after?: string;
  };
}

async function getCategoryPosts(slug: string, after?: string) {
  const { posts } = await graphqlClient.request(GET_ALL_POSTS, {
    first: 9,
    after,
    where: {
      categoryName: slug,
    },
  });

  return {
    posts: posts.nodes,
    pageInfo: posts.pageInfo,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { posts, pageInfo } = await getCategoryPosts(
    params.slug,
    searchParams.after
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Category: {params.slug}</h1>
      <PostGrid posts={posts} />
      <Pagination
        hasNextPage={pageInfo.hasNextPage}
        endCursor={pageInfo.endCursor}
      />
    </main>
  );
}

import { graphqlClient } from "@/lib/graphql-client";
import { GET_ALL_POSTS } from "@/lib/queries";
import { Post, PageInfo } from "@/types/post";
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

async function getTagPosts(slug: string, after?: string) {
  const { posts } = await graphqlClient.request(GET_ALL_POSTS, {
    first: 9,
    after,
    where: {
      tag: slug,
    },
  });

  return {
    posts: posts.nodes,
    pageInfo: posts.pageInfo,
  };
}

export default async function TagPage({ params, searchParams }: Props) {
  const { posts, pageInfo } = await getTagPosts(
    params.slug,
    searchParams.after
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Tag: #{params.slug}</h1>
      <PostGrid posts={posts} />
      <Pagination
        hasNextPage={pageInfo.hasNextPage}
        endCursor={pageInfo.endCursor}
      />
    </main>
  );
}

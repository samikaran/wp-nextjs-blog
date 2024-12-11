import { graphqlClient } from "@/lib/graphql-client";
import { GET_ALL_POSTS, GET_CATEGORIES, GET_TAGS } from "@/lib/queries";
import { Post, PageInfo, Category, Tag } from "@/types/post";
import Link from "next/link";
import SearchBar from "@/components/search-bar";
import Pagination from "@/components/pagination";
import PostGrid from "@/components/post-grid";

interface Props {
  searchParams: {
    q?: string;
    after?: string;
  };
}

async function getPosts(
  search?: string,
  after?: string
): Promise<{
  posts: Post[];
  pageInfo: PageInfo;
}> {
  try {
    const { posts } = await graphqlClient.request(GET_ALL_POSTS, {
      first: 9,
      after,
      search,
    });
    return {
      posts: posts.nodes,
      pageInfo: posts.pageInfo,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      posts: [],
      pageInfo: { hasNextPage: false, endCursor: "" },
    };
  }
}

async function getSidebar() {
  const [categoriesData, tagsData] = await Promise.all([
    graphqlClient.request(GET_CATEGORIES),
    graphqlClient.request(GET_TAGS),
  ]);

  return {
    categories: categoriesData.categories.nodes,
    tags: tagsData.tags.nodes,
  };
}

export default async function Home({ searchParams }: Props) {
  const { posts, pageInfo } = await getPosts(
    searchParams.q,
    searchParams.after
  );
  const { categories, tags } = await getSidebar();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-4">
            <SearchBar />

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Categories</h2>
              <ul className="space-y-2">
                {categories.map((category: Category) => (
                  <li key={category.id}>
                    <Link
                      href={`/category/${category.slug}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {category.name} ({category.count})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: Tag) => (
                  <Link
                    key={tag.id}
                    href={`/tag/${tag.slug}`}
                    className="px-3 py-1 bg-gray-200 rounded-full text-sm hover:bg-gray-300"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          {searchParams.q && (
            <h1 className="text-2xl font-bold mb-6">
              Search results for: {searchParams.q}
            </h1>
          )}

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-600">
                No posts found
              </h2>
              <p className="mt-2 text-gray-500">
                Try adjusting your search or browse our categories
              </p>
            </div>
          ) : (
            <PostGrid posts={posts} />
          )}

          {posts.length > 0 && (
            <Pagination
              hasNextPage={pageInfo.hasNextPage}
              endCursor={pageInfo.endCursor}
            />
          )}
        </main>
      </div>
    </div>
  );
}

import { getAllPosts, getSidebarData } from "@/lib/api";
import PostGrid from "@/components/post-grid";
import Pagination from "@/components/pagination";
import SearchBar from "@/components/search-bar";
import Link from "next/link";

interface Props {
  searchParams: {
    q?: string;
    after?: string;
  };
}

export default async function HomePage({ searchParams }: Props) {
  const posts = await getAllPosts(searchParams.after);
  const sidebarData = await getSidebarData();

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
                {sidebarData.categories.nodes.map((category) => (
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
                {sidebarData.tags.nodes.map((tag) => (
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
          {posts.nodes.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-600">
                No posts found
              </h2>
              <p className="mt-2 text-gray-500">
                Check back later for new content
              </p>
            </div>
          ) : (
            <>
              <PostGrid posts={posts.nodes} />
              <Pagination
                hasNextPage={posts.pageInfo.hasNextPage}
                endCursor={posts.pageInfo.endCursor}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

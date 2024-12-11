"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  hasNextPage: boolean;
  endCursor: string;
}

export default function Pagination({ hasNextPage, endCursor }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLoadMore = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("after", endCursor);
    router.push(`?${current.toString()}`);
  };

  return hasNextPage ? (
    <button
      onClick={handleLoadMore}
      className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mx-auto block"
    >
      Load More Posts
    </button>
  ) : null;
}

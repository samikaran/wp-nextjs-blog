import { serverClient, clientClient } from "@/lib/services/graphql-client";
import { GET_POST_BY_SLUG, GET_ALL_POSTS } from "@/lib/queries/post";
import { GET_SIDEBAR_DATA } from "@/lib/queries/home";
import { GET_CATEGORY_WITH_POSTS } from "@/lib/queries/category";
import { GET_TAG_WITH_POSTS } from "@/lib/queries/tag";
import { CREATE_COMMENT, GET_POST_COMMENTS } from "@/lib/queries/comment";

export async function getPost(slug: string) {
  try {
    // console.log("Fetching post with slug:", slug);
    // console.log("Using GraphQL URL:", config.graphqlUrl);

    const data = await serverClient.request(GET_POST_BY_SLUG, { slug });
    // console.log("Post data received:", data);

    return data.post;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}

export async function getAllPosts(after?: string) {
  try {
    const { posts } = await serverClient.request(GET_ALL_POSTS, {
      first: 9,
      after,
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      nodes: [],
      pageInfo: { hasNextPage: false, endCursor: "" },
    };
  }
}

export async function getSidebarData() {
  try {
    return await serverClient.request(GET_SIDEBAR_DATA);
  } catch (error) {
    console.error("Error fetching sidebar data:", error);
    return {
      categories: { nodes: [] },
      tags: { nodes: [] },
    };
  }
}

export async function getCategoryData(slug: string, after?: string) {
  try {
    const data = await serverClient.request(GET_CATEGORY_WITH_POSTS, {
      slug,
      first: 9,
      after,
    });

    if (!data.category) {
      return null;
    }

    return data.category;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

export async function getTagData(slug: string, after?: string) {
  try {
    const data = await serverClient.request(GET_TAG_WITH_POSTS, {
      slug,
      first: 9,
      after,
    });

    if (!data.tag) {
      return null;
    }

    return data.tag;
  } catch (error) {
    console.error("Error fetching tag:", error);
    return null;
  }
}

interface CommentInput {
  postId: number;
  author: string;
  authorEmail: string;
  content: string;
}

export async function getPostComments(postId: string) {
  try {
    const { post } = await clientClient.request(GET_POST_COMMENTS, {
      id: postId,
    });
    return post?.comments?.nodes || [];
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

// Add this helper function to decode WordPress IDs
export function getPostDatabaseId(id: string): number {
  // If it's already a number, return it
  if (!isNaN(Number(id))) {
    return Number(id);
  }

  try {
    // Try to decode base64 ID
    const decoded = atob(id);
    // Extract the numeric ID (assuming format like "post:123")
    const matches = decoded.match(/\d+/);
    if (matches) {
      return parseInt(matches[0], 10);
    }
    throw new Error("Invalid ID format");
  } catch (error) {
    console.error("Error decoding post ID:", error);
    throw new Error("Invalid post ID format");
  }
}

export async function createComment({
  postId,
  author,
  authorEmail,
  content,
}: {
  postId: string;
  author: string;
  authorEmail: string;
  content: string;
}) {
  try {
    // Convert the GraphQL ID to database ID
    const databaseId = getPostDatabaseId(postId);

    const { createComment } = await clientClient.request(CREATE_COMMENT, {
      input: {
        commentOn: databaseId,
        author,
        authorEmail,
        content,
      },
    });
    return createComment;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

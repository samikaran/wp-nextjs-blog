"use client";

import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import CommentForm from "./comment-form";
import type { Comment } from "@/types/post";

interface Props {
  postId: string;
  initialComments: Comment[];
}

export default function CommentsSection({ postId, initialComments }: Props) {
  const [comments, setComments] = useState(initialComments);

  const handleCommentAdded = () => {
    // In a real app, you'd fetch the updated comments here
    // For now, we'll just refresh the page
    window.location.reload();
  };

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              {comment.author?.node?.avatar?.url && (
                <Image
                  src={comment.author.node.avatar.url}
                  alt={comment.author.node.name || "Commenter"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div>
                <div className="font-medium">
                  {comment.author?.node?.name || "Anonymous"}
                </div>
                <time className="text-sm text-gray-500">
                  {format(new Date(comment.date), "MMMM dd, yyyy")}
                </time>
              </div>
            </div>
            <div
              className="prose prose-sm"
              dangerouslySetInnerHTML={{ __html: comment.content }}
            />
          </div>
        ))}
      </div>

      <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
    </section>
  );
}

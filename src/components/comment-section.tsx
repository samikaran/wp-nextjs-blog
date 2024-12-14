"use client";

import { useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { getPostComments, createComment } from "@/lib/api";

interface Comment {
  id: string;
  content: string;
  date: string;
  author: {
    node: {
      name: string;
      avatar?: {
        url: string;
      };
    };
  };
}

interface Props {
  postId: string;
  initialComments: Comment[];
}

export default function CommentSection({ postId, initialComments }: Props) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const refreshComments = async () => {
    try {
      const updatedComments = await getPostComments(postId);
      setComments(updatedComments);
    } catch (err) {
      console.error("Error refreshing comments:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await createComment({
        postId,
        author: formData.name,
        authorEmail: formData.email,
        content: formData.content,
      });

      if (result.success) {
        setFormData({
          name: "",
          email: "",
          content: "",
        });
        setSuccess(true);
        await refreshComments();
      } else {
        setError("Failed to submit comment");
      }
    } catch (err) {
      console.error("Comment submission error:", err);
      setError(err instanceof Error ? err.message : "Error submitting comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

      {/* Comments List */}
      <div className="space-y-6 mb-8">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              {comment.author.node.avatar?.url ? (
                <Image
                  src={comment.author.node.avatar.url}
                  alt={comment.author.node.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-sm">
                    {comment.author.node.name[0].toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <div className="font-medium">{comment.author.node.name}</div>
                <time className="text-sm text-gray-500">
                  {format(new Date(comment.date), "MMMM dd, yyyy")}
                </time>
              </div>
            </div>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: comment.content }}
            />
          </div>
        ))}

        {comments.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No comments yet. Be the first to comment!
          </div>
        )}
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-md">{error}</div>
        )}

        {success && (
          <div className="p-4 bg-green-50 text-green-600 rounded-md">
            Your comment has been submitted successfully!
          </div>
        )}

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Comment *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Submitting..." : "Submit Comment"}
        </button>
      </form>
    </section>
  );
}

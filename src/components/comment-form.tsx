"use client";

import { useState } from "react";
import { graphqlClient } from "@/lib/graphql-client";
import { ADD_COMMENT } from "@/lib/queries";

interface Props {
  postId: string;
  onCommentAdded: () => void;
}

export default function CommentForm({ postId, onCommentAdded }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await graphqlClient.request(ADD_COMMENT, {
        postId,
        content,
        authorName: name,
        authorEmail: email,
      });

      setName("");
      setEmail("");
      setContent("");
      onCommentAdded();
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
        />
      </div>

      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700"
        >
          Comment
        </label>
        <textarea
          id="comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Add Comment"}
      </button>
    </form>
  );
}

"use client";
import { useState } from "react";

interface CommentProps {
  onAddComment: (comment: string) => void;
}

export default function CommentComponent({ onAddComment }: CommentProps) {
  const [comment, setComment] = useState("");

  const handleAddComment = () => {
    if (comment.trim()) {
      onAddComment(comment.trim());
      setComment("");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add a Comment</h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleAddComment}
          className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-400 focus:outline-none"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
}

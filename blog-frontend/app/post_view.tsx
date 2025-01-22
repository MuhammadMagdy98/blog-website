"use client";
import CommentComponent from "@/components/comment";
import { useState } from "react";

export default function PostViewPage() {
    const [comments, setComments] = useState<{ id: number; text: string }[]>([]);
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState("");
  
    const addComment = (text: string) => {
      const newComment = { id: Date.now(), text };
      setComments([...comments, newComment]);
    };
  
    const deleteComment = (id: number) => {
      setComments(comments.filter((comment) => comment.id !== id));
    };
  
    const startEditing = (id: number, text: string) => {
      setEditingCommentId(id);
      setEditingText(text);
    };
  
    const saveEdit = (id: number) => {
      setComments(
        comments.map((comment) =>
          comment.id === id ? { ...comment, text: editingText } : comment
        )
      );
      setEditingCommentId(null);
      setEditingText("");
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-8">
          {/* Post View */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-4">Post Title</h1>
            <p className="text-gray-700 mb-4">
              This is the content of the post. It contains all the details about the topic.
            </p>
            <div className="text-gray-500 text-sm">Posted on: Jan 21, 2025</div>
          </div>
  
          {/* Add Comment Component */}
          <CommentComponent onAddComment={addComment} />
  
          {/* Comments Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>
            {comments.length === 0 ? (
              <p className="text-gray-500">No comments yet. Be the first to comment!</p>
            ) : (
              <ul className="space-y-4">
                {comments.map((comment) => (
                  <li
                    key={comment.id}
                    className="bg-gray-100 px-4 py-3 rounded-lg text-gray-800"
                  >
                    {editingCommentId === comment.id ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        <button
                          onClick={() => saveEdit(comment.id)}
                          className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-400 focus:outline-none"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingCommentId(null)}
                          className="px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-400 focus:outline-none"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <span>{comment.text}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditing(comment.id, comment.text)}
                            className="px-3 py-1 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 focus:outline-none"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteComment(comment.id)}
                            className="px-3 py-1 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-400 focus:outline-none"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }
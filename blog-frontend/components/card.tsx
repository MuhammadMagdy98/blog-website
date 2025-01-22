"use client";

interface CardProps {
  title: string;
  description: string;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CoolCard({ name, onEdit, onDelete }: CardProps) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 truncate">{name}</h2>
        <div className="flex justify-end gap-4">
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition duration-200"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300 focus:outline-none transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
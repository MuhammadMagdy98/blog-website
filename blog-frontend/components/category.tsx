"use client";
import { useState } from "react";

export function CategoriesCRUD() {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const deleteCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          Manage Categories
        </h1>

        {/* Categories Section */}
        <div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Add a new category"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={addCategory}
              className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-400 focus:outline-none"
            >
              Add Category
            </button>
          </div>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg text-gray-800"
              >
                <span>{category}</span>
                <button
                  onClick={() => deleteCategory(category)}
                  className="px-3 py-1 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-400 focus:outline-none"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

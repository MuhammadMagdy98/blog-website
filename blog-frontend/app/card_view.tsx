"use client";
import { useState } from "react";
import CoolCard from "@/components/card";
export default function CardListPage() {
    const [cards, setCards] = useState([
      { id: 1, name: "Card 1" },
      { id: 2, name: "Card 2" },
      { id: 3, name: "Card 3" },
    ]);
    const [editingCard, setEditingCard] = useState<null | { id: number; name: string }>(null);
  
    const handleEdit = (id: number) => {
      const cardToEdit = cards.find((card) => card.id === id);
      if (cardToEdit) {
        setEditingCard(cardToEdit);
      }
    };
  
    const handleSave = () => {
      if (editingCard) {
        setCards(
          cards.map((card) =>
            card.id === editingCard.id
              ? { ...card, name: editingCard.name }
              : card
          )
        );
        setEditingCard(null);
      }
    };
  
    const handleDelete = (id: number) => {
      setCards(cards.filter((card) => card.id !== id));
    };
  
    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Card List</h1>
  
        {editingCard && (
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Card</h2>
            <input
              type="text"
              value={editingCard.name}
              onChange={(e) => setEditingCard({ ...editingCard, name: e.target.value })}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg text-gray-900 bg-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Name"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none transition duration-200"
              >
                Save
              </button>
              <button
                onClick={() => setEditingCard(null)}
                className="px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 focus:outline-none transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <CoolCard
              key={card.id}
              name={card.name}
              onEdit={() => handleEdit(card.id)}
              onDelete={() => handleDelete(card.id)}
            />
          ))}
        </div>
      </div>
    );
  }
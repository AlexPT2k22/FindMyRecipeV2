import React from 'react';
import { Clock, Trash2 } from 'lucide-react';

interface SavedRecipeCardProps {
  recipe: {
    id: string;
    title: string;
    description: string;
    image_url: string;
    cuisine_type: string;
    cooking_time: number;
  };
  onRemove: (id: string) => void;
}

export default function SavedRecipeCard({ recipe, onRemove }: SavedRecipeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={recipe.image_url}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{recipe.title}</h3>
          <button
            onClick={() => onRemove(recipe.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove recipe"
          >
            <Trash2 size={20} />
          </button>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
            {recipe.cuisine_type}
          </span>
          <div className="flex items-center ml-4">
            <Clock size={16} className="mr-1" />
            <span>{recipe.cooking_time} mins</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {recipe.description}
        </p>
        
        <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors">
          View Recipe
        </button>
      </div>
    </div>
  );
}
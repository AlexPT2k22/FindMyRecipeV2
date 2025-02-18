import { Clock, User, Bookmark } from "lucide-react";
import { Recipe } from "./types";

interface RecipeCardProps {
  recipe: Recipe;
  onSave: (recipe: Recipe) => void;
}

export default function RecipeCard({ recipe, onSave }: RecipeCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover object-center"
      />
      <div className="p-4">
        <a
          href={recipe.sourceUrl}
          className="text-xl font-bold text-gray-800 no-underline hover:underline hover:text-orange-500"
        >
          {recipe.title}
        </a>

        {/* Tempo de preparo */}
        {recipe.readyInMinutes && (
          <div className="flex items-center space-x-2 mt-2">
            <Clock className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600">
              {recipe.readyInMinutes} minutes
            </span>
          </div>
        )}

        {/* Porções */}
        {recipe.servings && (
          <div className="flex items-center space-x-2 mt-2">
            <User className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600">{recipe.servings} servings</span>
          </div>
        )}

        {/* Botão de salvar */}
        <button
          onClick={() => onSave(recipe)}
          className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
        >
          <Bookmark size={20} />
          <span>Save Recipe</span>
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import RecipeCard from "./RecipeCard.tsx";
import { Recipe } from "./types.ts";
import { supabase } from "../../lib/supabase.ts";

const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

export default function RecipeSearch() {
  const [ingredients, setIngredients] = useState("");
  const [excludeIngredients, setExcludeIngredients] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveRecipe = async (recipe: Recipe) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("You need to be logged in to save recipes.");
      return;
    }
    
    console.log("User:", user?.id);

    try {
      const { error } = await supabase
        .from('saved_recipes')
        .insert({
          id: crypto.randomUUID(),
          user_id: user.id,
          recipe_id: recipe.id,
        })
  
      if (error) throw error;
      alert("Recipe saved successfully!");
    } catch (error) {
      console.error("Error saving recipe:", error);
      setError("Error saving recipe. Please try again.");
    }
  };

  const searchRecipes = async () => {
    if (!ingredients.trim()) {
      setError("Please enter at least one ingredient.");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const params = new URLSearchParams({
        includeIngredients: ingredients.replace(/\s+/g, ""), // Remove espaços desnecessários
        number: "9", // Número de receitas a retornar
        apiKey: SPOONACULAR_API_KEY,
        addRecipeInformation: "true",
        addRecipeInstructions: "true",
        addRecipeNutrition: "true",
        sort: "min-missing-ingredients"
      });
  
      if (excludeIngredients.trim()) {
        params.append(
          "excludeIngredients",
          excludeIngredients.replace(/\s+/g, "")
        );
      }
  
      if (dietaryPreferences) {
        params.append("diet", dietaryPreferences);
      }
  
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`
      );
  
      if (!response.ok) {
        throw new Error("Erro ao buscar receitas. Tenta novamente.");
      }
  
      const data = await response.json();
      const recipesBasic = data.results; // Contém apenas informações básicas
  
      // Obter detalhes completos de cada receita
      const detailedRecipes = await Promise.all(
        recipesBasic.map(async (recipe: { id: number }) => {
          const recipeResponse = await fetch(
            `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${SPOONACULAR_API_KEY}`
          );
          return recipeResponse.ok ? recipeResponse.json() : null;
        })
      );
  
      setRecipes(detailedRecipes.filter((r) => r !== null)); // Filtra possíveis falhas
    } catch (err) {
      setError("Erro ao buscar receitas. Tenta novamente.");
      console.error("Erro:", err);
    } finally {
      setLoading(false);
    }
  };
  
  const dietaryOptions = [
    "vegetarian",
    "vegan",
    "gluten-free",
    "dairy-free",
    "low-carb",
    "keto",
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="relative bg-orange-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Recipes with Ingredients You Have
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover delicious recipes using the ingredients you already have in
            your kitchen
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availabe Ingredients
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="ex: chicken, rice, tomato"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Exclude Ingredients
              </label>
              <input
                type="text"
                value={excludeIngredients}
                onChange={(e) => setExcludeIngredients(e.target.value)}
                placeholder="ex: nuts, sugar, salt"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Dietary Preferences
            </label>
            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setDietaryPreferences(option)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    dietaryPreferences === option
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={searchRecipes}
            disabled={loading}
            className="w-full md:w-auto bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search size={20} />
                <span>Find Recipes</span>
              </>
            )}
          </button>

          {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}
        </div>

        {/* Results Section */}
        {recipes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} onSave={saveRecipe}/>
            ))}
          </div>
        )}

        {!loading && recipes.length === 0 && !error && (
          <div className="text-center py-12">
            <Filter className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">
                No recipes found. Try searching with different ingredients or
                dietary preferences.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

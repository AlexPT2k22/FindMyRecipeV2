import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { CreditCard, Heart, Settings, LogOut } from 'lucide-react';
import DashboardCharts from './DashboardCharts';
import SavedRecipeCard from './SavedRecipeCard';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface SavedRecipe {
  id: string;
  recipe: {
    id: string;
    title: string;
    description: string;
    image_url: string;
    cuisine_type: string;
    cooking_time: number;
  };
}

export default function UserDashboard() {
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    loadUserData();
    loadSavedRecipes();
  }, []);

  const loadUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const loadSavedRecipes = async () => {
    try {
      const { data: recipes, error } = await supabase
        .from('saved_recipes')
        .select(`
          id,
          recipe:recipes (
            id,
            title,
            description,
            image_url,
            cuisine_type,
            cooking_time
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedRecipes(recipes || []);
    } catch (error) {
      console.error('Error loading saved recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveRecipe = async (recipeId: string) => {
    try {
      const { error } = await supabase
        .from('saved_recipes')
        .delete()
        .match({ id: recipeId });

      if (error) throw error;
      setSavedRecipes(recipes => recipes.filter(recipe => recipe.id !== recipeId));
    } catch (error) {
      console.error('Error removing recipe:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-orange-500">
                      {user?.email?.[0].toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Welcome back!
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">{user?.email}</p>
                </div>
                
                <nav className="space-y-2">
                  <a
                    href="#saved"
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600"
                  >
                    <Heart size={20} />
                    <span>Saved Recipes</span>
                  </a>
                  <a
                    href="#subscription"
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600"
                  >
                    <CreditCard size={20} />
                    <span>Subscription</span>
                  </a>
                  <a
                    href="#settings"
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600"
                  >
                    <Settings size={20} />
                    <span>Settings</span>
                  </a>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600 w-full text-left"
                  >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                  </button>
                </nav>
              </div>
            </div>
  
            {/* Main Content */}
            <div className="md:col-span-3">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
              
              {/* Charts */}
              <div className="mb-8">
                <DashboardCharts />
              </div>
              
              {/* Saved Recipes */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Saved Recipes</h2>
                {savedRecipes.length === 0 ? (
                  <div className="text-center py-8 bg-white rounded-lg shadow-md">
                    <Heart size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">
                      No saved recipes yet. Start exploring to save your favorites!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedRecipes.map((item) => (
                      <SavedRecipeCard
                        key={item.id}
                        recipe={item.recipe}
                        onRemove={handleRemoveRecipe}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }else{
    return <div className="min-h-screen bg-gray-50 pt-16 flex  justify-center">
      <h1 className="text-4xl font-bold text-gray-900 text-center">
        Unauthorized
      </h1>
    </div>;
  }
}
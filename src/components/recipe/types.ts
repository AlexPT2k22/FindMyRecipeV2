export interface Recipe {
  id: number;
  title: string;
  image: string;
  sourceName?: string;
  healthScore?: number;
  sourceUrl?: string;
  readyInMinutes: number;
  servings: number;
  extendedIngredients: { original: string }[];
  cuisines: string[];
  dishTypes: string[];
}

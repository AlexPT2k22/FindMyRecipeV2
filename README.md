# FindMyRecipeV2

[![Website](https://img.shields.io/website?url=https%3A%2F%2Ffind-my-recipe-v2.vercel.app)](https://find-my-recipe-v2.vercel.app)

## Description

FindMyRecipeV2 is a web application that allows users to easily find recipes.  
With an intuitive interface, users can search for recipes by ingredients or dish names and get a variety of matching results.

## Features

- Search for recipes by ingredients or dish name.
- View detailed recipe information, including ingredients, preparation steps, and cooking time.
- Responsive interface that adapts to mobile and desktop devices.

## Technologies Used

- **Frontend:**
  - TypeScript
  - Tailwind CSS
  - Vite
- **Backend:**
  - Supabase
  - Node.js
- **Hosting:**
  - Vercel

## Prerequisites

- Install [Node.js](https://nodejs.org/en) on your machine.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/AlexPT2k22/FindMyRecipeV2.git
   ```
2. Navigate to the project directory:
   ```
   cd FindMyRecipeV2
   ```
3. Install dependencies:
   ```
   npm install
   ```
## Environment Variables
  Create .env file containing:
  ```
  VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_KEY_
  VITE_SUPABASE_URL=SUPABASE_URL
  VITE_SPOONACULAR_API_KEY=YOUR_SPOONACULAR_API_KEY
  SPOONACULAR_URL=https://api.spoonacular.com/recipes/findByIngredients
  ```
## Usage
  To start the development server, run:
  ```
  npm run dev
   ```
  The application will be available at http://localhost:3000

## Contributing

  - Fork the repository
  - Create your feature branch (git checkout -b feature/AmazingFeature)
  - Commit your changes (git commit -m 'Add some AmazingFeature')
  - Push to the branch (git push origin feature/AmazingFeature)
  - Open a Pull Request

## License
  Distributed under the MIT License.

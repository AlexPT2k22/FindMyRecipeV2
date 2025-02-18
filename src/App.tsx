// Code to be rendered in the App component
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserDashboard from "./components/user/UserDashboard";
import About from "./About";
import Pricing from "./Pricing";
import RecipeSearch from "./components/recipe/RecipeSearch";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
          <Routes>
            <Route path="/" element={<RecipeSearch />} />
            {/* Rota para o Dashboard */}
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<h1>Not Found</h1>} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
      </div>
    </Router>
  );
}


export default App;

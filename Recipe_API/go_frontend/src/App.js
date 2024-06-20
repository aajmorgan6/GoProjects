import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import RecipesPage from "./RecipesPage";
import Home from "./Home";
import React from "react";
import AddRecipe from "./Pages/AddRecipe";

function App() {
    return (
      <Router>          
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path="/recipes" element={<RecipesPage />}/>
            <Route path="/recipes/add" element={<AddRecipe />}/>
          </Routes>
      </Router>
    );
}

export default App;

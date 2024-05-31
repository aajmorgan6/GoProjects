import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import RecipesPage from "./RecipesPage";
import Home from "./Home";
import React from "react";

function App() {
    return (
      <Router>          
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path="/recipes" element={<RecipesPage />}/>
          </Routes>
      </Router>
    );
}

export default App;

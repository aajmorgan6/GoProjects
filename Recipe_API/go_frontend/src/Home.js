import React from "react";
import { Link } from "react-router-dom";

function Home() {

    return (
        <div>
            <h3>This is the Home Page</h3>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/recipes">Recipes</Link>
                </li>
            </ul>
        </div>
        
    )
    
}

export default Home;
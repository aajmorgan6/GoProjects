import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddRecipe() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        ingredients: ""
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({...data, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, ingredients} = data;
        const res = await fetch("http://localhost:8080/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, ingredients})
        });
        const body = res.json();
        console.log(body);
        navigate("/recipes")
    }

    return (
        <div className="container">
            <Button href="/recipes" variant="contained">Back</Button>
            <h1 className="text-center">Add Recipe</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" id="name" onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="ingredients" className="form-label">Ingredients</label>
                    <input type="text" className="form-control" name="ingredients" id="ingredients" onChange={handleInput} />
                </div>
                <Button type="submit" variant="contained">Add</Button>
            </form>
        </div>
    );
}

export default AddRecipe;
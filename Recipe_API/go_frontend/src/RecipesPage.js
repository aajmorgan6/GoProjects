import { React, useState, useEffect } from "react";
import { Button } from '@mui/material';

function RecipesPage() {
    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]);

    const callAPI = async () => {
        const res = await fetch('http://localhost:8080/recipes');
        const body = await res.json();
        console.log(body);
        setData(body);
    }

    useEffect(()=>{
        callAPI();
    }, [])

    return (
        <div className="container">
            <h1 className="text-center">Welcome to the Recipies Page!</h1>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Ingredients</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map(key => (
                        <tr key={key}>
                            <td>{data[key].name}</td>
                            <td>{data[key].ingredients}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <Button href="/" variant="contained">Back</Button>
                <Button href="/recipes/add" variant="contained">Add</Button>
            </div>
        </div>
    
    )
}

export default RecipesPage;
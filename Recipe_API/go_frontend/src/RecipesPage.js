import { React, useState, useEffect } from "react";

function RecipesPage() {
    const [data, setData] = useState([]);

    // const callApi = async () => {
    //     const res = await fetch('http://localhost:8080/recipes');
    //     const body = await res.json();
    //     console.log(body);
    //     setData(body);
        
    // }

    useEffect(() => {
        // callApi();
        fetch('http://localhost:8080/recipes/ham-and-cheese-toasties')
        .then(resp => resp.json())
        .then(data => setData(data))
        // .then(data => console.log(data))
    }, [])

    return (
        <div>
            <h1>Welcome to the Recipies Page!</h1>
            {data}
        </div>
    
    )
}

export default RecipesPage;
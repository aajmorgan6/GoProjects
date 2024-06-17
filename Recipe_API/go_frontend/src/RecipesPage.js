import { React, useState, useEffect } from "react";

function RecipesPage() {
    const [data, setData] = useState([]);

    const callAPI = async () => {
        const res = await fetch('http://localhost:8080/recipes')
        const body = await res.json()
        console.log(body)
        setData(body)
    }

    useEffect(()=>{
        callAPI()
    }, [])

    return (
        <div>
            <h1>Welcome to the Recipies Page!</h1>
            <table className="table">
                <thead>
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
        </div>
    
    )
}

export default RecipesPage;
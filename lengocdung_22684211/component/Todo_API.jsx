import { useState, useEffect } from 'react'
import './Todo_API.css'
export default function Bai02() {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        fetch('https://67c7c89ec19eb8753e7abb1c.mockapi.io/thuchanh04')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setRecipes(data);
            })
    }, []);

    function onClickAPI() {
        fetch('https://67c7c89ec19eb8753e7abb1c.mockapi.io/thuchanh04', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: 1,
                title: 'New recipe',
                minute: 10
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setRecipes([...recipes, data]);
            })
    }

    function onclickDelete(id) {
        return function () {
            fetch(`https://67c7c89ec19eb8753e7abb1c.mockapi.io/thuchanh04/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setRecipes(recipes.filter(recipe => recipe.id !== id));
                })
        }
    }

    function onclickEdit(id) {
        return function () {
            fetch(`https://67c7c89ec19eb8753e7abb1c.mockapi.io/thuchanh04/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: 'Edit recipe',
                    minute: 20
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setRecipes(recipes.map(recipe => recipe.id === id ? data : recipe));
                })
        }
    }

    return (
        <>
            <div>
                <ul id='ul'>
                    {recipes.map((recipe, index) => (
                        <li key={recipe.id}>
                            <p>({index + 1}): {recipe.title}</p>
                            <p>{recipe.minute} minutes</p>
                            <button className='w-20 mt-5 h-10 rounded bg-amber-200' onClick={onclickDelete(recipe.id)} id='buttonDelete'>Delete</button>
                            <button className='w-20 ml-1.5 mt-5 h-10 rounded bg-blue-200' onClick={onclickEdit(recipe.id)} id='buttonEdit'>Edit</button>
                        </li>
                    ))}
                </ul>
            </div>
            <button className='w-40 h-10 rounded bg-blue-400' onClick={onClickAPI}>Add</button>
        </>
    )
}
import { useState, useEffect } from 'react'
import './Bai02.css'
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
            console.log('Deleting id:', id);
            fetch(`https://67c7c89ec19eb8753e7abb1c.mockapi.io/thuchanh04/${id}`, {
                method: 'DELETE',
            })
                .then(res => {
                    console.log('Response status:', res.status);
                    if (!res.ok) {
                        return res.text().then(text => {
                            throw new Error(`Failed to delete id ${id}. Status: ${res.status}. Message: ${text}`);
                        });
                    }
                    // Gọi lại API để lấy dữ liệu mới nhất
                    return fetch('https://67c7c89ec19eb8753e7abb1c.mockapi.io/thuchanh04')
                        .then(res => res.json())
                        .then(data => setRecipes(data));
                })
                .catch(error => {
                    console.error('Error deleting recipe:', error);
                    alert('Không thể xóa trên API: ' + error.message);
                });
        };
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
                    setRecipes(recipes.map(recipe => recipe.id.object === id ? data : recipe));
                })
        }
    }

    return (
        <>
            {recipes.map((recipe, index) => (
                <li key={recipe.id.object}>

                    <div id='recipe-item' className='flex'>
                        <p>{index + 1}: {recipe.title}</p>
                        <p>{recipe.minute} minutes</p>
                        <button onClick={onclickDelete(recipe.id.object)} id='buttonDelete'>Delete</button>
                        <button onClick={onclickEdit(recipe.id.object)} id='buttonEdit'>Edit</button>
                    </div>
                </li>
            ))}
            <button onClick={onClickAPI}>Add</button>
        </>
    )
}
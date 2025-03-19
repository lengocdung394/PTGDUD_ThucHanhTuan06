import React, { useReducer, useRef } from 'react';


const initialState = [
    { id: 1, name: 'ReactJS' },
    { id: 2, name: 'Angular' },
    { id: 3, name: 'NodeJS' },
    { id: 4, name: 'NodeJS' },
    { id: 5, name: 'NodeJS' },
    { id: 6, name: 'NodeJS' },
    { id: 7, name: 'NodeJS' },


]

function reducer(state, action) {
    switch (action.type) {
        case 'Add':
            return [...state, action.newTask];
    }

}
export default function Bai06() {

    const [state, dispatch] = useReducer(reducer, initialState);
    const inputA = useRef(null);
    let nextID = 4;


    const onClickChange = () => {
        const value = inputA.current.value;
        const newTask = { id: nextID++, name: value };
        dispatch({ type: 'Add', newTask });
    }


    return (
        <>
            <ul className='flex flex-wrap m-5'>
                {
                    state.map(item => {
                        return <li className='w-10 h-10 rounded flex flex-col items-center gap-2' key={item.id}>
                        <h2 className='mb-1.5'>{item.name}</h2>
                        <button className= 'ml-2 rounded w-20 h-10 border-2 bg-red-500' key={item.id}>Delete</button>
                        <button className= 'ml-2 rounded w-20 h-10 border-2 bg-emerald-400' key={item.id}>Edit</button> </li>
                    })
                }
            </ul>
            <input type="text" placeholder='Nhap gia tri vao day' useRef={inputA} className='w-80 h-10 rounded border-2' />
            <button onClick={() => onClickChange('Add')} className= 'ml-2 border-2 rounded w-30 h-10 bg-amber-600'>Add</button>


        </>
    )




}
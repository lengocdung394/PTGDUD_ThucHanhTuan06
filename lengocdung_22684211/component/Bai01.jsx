
import React, { useReducer, useRef } from 'react';

const initialState = { result: 0, a: 0, b: 0, operation: "---" };

function reducer(state, action) {
    switch (action.type) {
        case 'cong':
            return { 
                ...state, 
                a: action.a,        // Cập nhật a
                b: action.b,   
                operation: "+",     // Cập nhật b
                result: action.a + action.b  // Tính kết quả
            };
        case 'tru':
            return { 
                ...state, 
                a: action.a,        // Cập nhật a
                b: action.b,  
                operation: "-" ,     // Cập nhật b
                result: action.a - action.b  // Tính kết quả
            };
        default:
            return state;
    }
}

export default function Bai01() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const inputA = useRef(null);
    const inputB = useRef(null);

    const handleClick = (operation) => {
        const a = parseFloat(inputA.current.value) || 0;
        const b = parseFloat(inputB.current.value) || 0;
        dispatch({ type: operation, a, b });
    };

    return (
        <div>
            <div className='m-5'>
                <label htmlFor="">Nhap A: </label>
                <input type="text" className='m-8 border' placeholder='nhap a' ref={inputA} />
                <label htmlFor="">Nhap B: </label>
                <input type="text" className='m-8 border' placeholder='nhap b' ref={inputB} />
            </div>
            <div>
                <button className='w-20 h-10 bg-amber-300' onClick={() => handleClick('cong')}>+</button>
                <button className='w-20 h-10 bg-emerald-600' onClick={() => handleClick('tru')}>-</button>
            </div>
            <h2>Ket qua cua: {state.a} {state.operation} {state.b} = {state.result}</h2>
        </div>
    );
}
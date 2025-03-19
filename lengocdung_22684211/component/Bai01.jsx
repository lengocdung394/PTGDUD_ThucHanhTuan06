import React, { useReducer, useRef } from 'react';

const initialState = { result: 0, a: 0, b: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'cong':
            return { ...state, result: state.a + state.b };
        case 'tru':
            return { ...state, result: state.a - state.b };
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
            <div>
                <input type="text" placeholder='nhap a' ref={inputA} />
                <input type="text" placeholder='nhap b' ref={inputB} />
            </div>
            <div>
                <button onClick={() => handleClick('cong')}>+</button>
                <button onClick={() => handleClick('tru')}>-</button>
            </div>
            <h2>Result: {state.result}</h2>
        </div>
    );
}
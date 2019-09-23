import React, { useState, useEffect } from 'react';
import { BACKEND_URL } from '../../services/api';

export function News() {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const result = await fetch(`${BACKEND_URL}/todos`)
            const data = await result.json()
            setTodos(data)
        }
        getData()
    })
    return (
        <section>{ todos.map((m) => <div>{m.task}</div>) }</section>
    );
}

export default News;
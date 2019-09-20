import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [todos, setTodos ] = useState([]);
  useEffect(() => {
    const getData = async () => {
     const result = await fetch('https://backend:3000/todos')
     const data = await result.json()
     setTodos(data)
    }
    getData()
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.!!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>Also learn to deploy</p>
        { todos.map((m)=> <div>{m.task}</div>) }
      <p>BACKEND: { process.env.REACT_APP_BACKEND_URL }</p>
      </header>
    </div>
  );
}

export default App;

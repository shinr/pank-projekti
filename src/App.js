import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [todos, setTodos ] = useState([]);
  useEffect(() => {
    const getData = async () => {
     const result = await fetch('http://localhost:4000/todos')
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
      </header>
    </div>
  );
}

export default App;

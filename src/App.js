import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import News from './views/news'
import Main from './views/main'
import Contact from './views/contact'

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <span><Link to="#">Koti</Link></span>
          <span><Link to="#/news">Uutiset</Link></span>
          <span><Link to="#/contact">Ota yhteyttä</Link></span>
        </header>
        <main className="App-main">
          <Switch>
            <Route path='#/news' component={News} />
            <Route path='#/contact' component={Contact} />
            <Route path='#' component={Main} />
          </Switch>
        </main>
        <footer className="App-footer">
          We love you
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

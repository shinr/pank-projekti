import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import NavBar from './ui/navbar'
import News from './views/news'
import Main from './views/main'
import Contact from './views/contact'

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <NavBar>
            <Link to="/">Koti</Link>
            <Link to="/news">Uutiset</Link>
            <Link to="/contact">Ota yhteyttä</Link>
          </NavBar>
        </header>
        <main className="App-main">
          <Switch>
            <Route path='/news' component={News} />
            <Route path='/contact' component={Contact} />
            <Route path='/' component={Main} />
          </Switch>
        </main>
        <footer className="App-footer">
          {process.env.REACT_APP_DEVELOPMENT
            ? <div>DEVELOPMENTAL VERSION</div>
            : <div>TEST VERSION</div>}
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

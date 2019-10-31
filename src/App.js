import React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';

import NavBar from './ui/navbar'
import News from './views/news'
import Main from './views/main'
import Contact from './views/contact'
import Documents from './views/documents'

import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <header className="App-header">
          <NavBar>
            <Link to="/">Koti</Link>
            <Link to="/news">Uutiset</Link>
            <Link to="/contact">Ota yhteyttä</Link>
            <Link to="/documents">Tietopankki</Link>
          </NavBar>
        </header>
        <main className="App-main">
          <Switch>
            <Route path='/news' component={News} />
            <Route path='/contact' component={Contact} />
            <Route path='/documents' component={Documents} />
            <Route path='/' component={Main} />
          </Switch>
        </main>
        <footer className="App-footer">
          {process.env.REACT_APP_DEVELOPMENT
            ? <div>DEVELOPMENTAL VERSION!</div>
            : <div>TEST VERSION</div>}
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;

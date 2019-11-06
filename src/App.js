import React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faBars, faCaretDown, faCaretRight, faUser, faDownload } from '@fortawesome/free-solid-svg-icons'

import { AppStateProvider, initialAppState } from "./state/state"
import NavBar from './ui/navbar'
import Footer from "./ui/footer"
import News from './views/news'
import Main from './views/main'
import Contact from './views/contact'
import Documents from './views/documents'

import './App.css';
import { appReducer } from './state/reducers';

function App() {
  // add fontawesome icons into the library, are used with FontAwesomeIcon icon="" -component
  library.add(faCheckSquare, faBars, faCaretDown, faCaretRight, faUser, faDownload)
  return (
    <AppStateProvider initialState={initialAppState} reducer={appReducer}>
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
            <Footer />
          </footer>
        </div>
      </HashRouter>
    </AppStateProvider>
  );
}

export default App;

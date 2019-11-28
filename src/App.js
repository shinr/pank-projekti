import React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faBars, faCaretDown, faCaretRight, faUser, faDownload, faCalendar, faCalendarAlt, faHome, faNewspaper, faServer, faBook } from '@fortawesome/free-solid-svg-icons'

import { AppStateProvider, initialAppState } from "./state/state"
import NavBar from './ui/navbar'
import Footer from "./ui/footer"
import News from './views/news'
import Main from './views/main'
import Organization from './views/organization'
import Documents from './views/documents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './App.css';
import { appReducer } from './state/reducers';

function App() {
  // add fontawesome icons into the library, are used with FontAwesomeIcon icon="" -component
  library.add(faCheckSquare, faBars, faCaretDown, faCaretRight, faUser, faDownload, faCalendar, faCalendarAlt, faHome, faNewspaper, faServer, faBook)
  return (
    <AppStateProvider initialState={initialAppState} reducer={appReducer}>
      <HashRouter>
        <div className="App">
          <header className="App-header">
            <NavBar>
              <Link to="/"><FontAwesomeIcon icon="home"/>Koti</Link>
              <Link to="/news"><FontAwesomeIcon icon="newspaper"/>Uutiset</Link>
              <Link to="/pank"><FontAwesomeIcon icon="book"/>Organisaatio</Link>
              <Link to="/documents"><FontAwesomeIcon icon="server"/>Tietopankki</Link>
            </NavBar>
          </header>
          <main className="App-main">
            <Switch>
              <Route path='/news' component={News} />
              <Route path='/pank' exact component={Organization} />
              <Route path='/pank/:tab/' component={Organization} />
              <Route path='/documents' exact component={Documents} />
              <Route path='/documents/:tag/' component={Documents} />
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

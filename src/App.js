import React from 'react';
import { HashRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faBars, faCaretDown, faCaretRight, faUser, faDownload, faCalendar, faCalendarAlt, faHome, faNewspaper, faServer, faBook } from '@fortawesome/free-solid-svg-icons'

import { AppStateProvider, initialAppState, UserStateProvider } from "./state/state"
import { appReducer, userReducer } from './state/reducers';

import { AppMain } from "./AppMain"

import './App.css';


function App() {
  // add fontawesome icons into the library, are used with FontAwesomeIcon icon="" -component
  library.add(faCheckSquare, faBars, faCaretDown, faCaretRight, faUser, faDownload, faCalendar, faCalendarAlt, faHome, faNewspaper, faServer, faBook)
  return (
    <HashRouter>
      <AppStateProvider initialState={initialAppState} reducer={appReducer}>
        <UserStateProvider initialState={{}} reducer={userReducer}>
          <AppMain />
        </UserStateProvider>
      </AppStateProvider>
    </HashRouter>

  );
}

export default App;

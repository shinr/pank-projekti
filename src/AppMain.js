import React, { useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useAppStateValue } from "./state/state"

import NavBar from './ui/navbar'
import Footer from "./ui/footer"
import { Downloader } from "./ui/documents/Downloader"
import News from './views/news'
import Main from './views/main'
import Organization from './views/organization'
import Documents from './views/documents'

import { getPages, getTags, getDocuments } from "./services/api"
import { when } from "./utils/clojure"
import { actions, payloadAction } from "./state/actions"

import './App.css';

export const AppMain = () => {
    const [{ pages, tags, refresh }, dispatch] = useAppStateValue()
    useEffect(() => {
        const getData = async () => {
            const data = await getPages(dispatch)
            when(Object.keys(pages) !== Object.keys(data),
                () => dispatch(payloadAction(actions.SAVE_PAGES, { pages: data })))
        }
        const getAllTags = async () => {
            const data = await getTags(dispatch)
            when(tags.length !== data.length,
                () => dispatch(payloadAction(actions.SAVE_TAGS, { tags: data })))
        }
        when(refresh.pages, () => getData())
        when(refresh.tags, () => getAllTags())
        when(refresh.documents, async () => dispatch(payloadAction(actions.SAVE_DOCUMENTS, { documents: await getDocuments(dispatch)})))
    })
    return (<div className="App">
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
                <Route path='/documents/:currentTab/' component={Documents} />
                <Route path='/download/:id/:filename' component={Downloader} />
                <Route path='/' component={Main} />
            </Switch>
        </main>
        <footer className="App-footer">
            <Footer />
        </footer>
    </div>)
}

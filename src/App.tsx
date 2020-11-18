import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import {Header} from './components/header';

import { Hexabase } from 'hexabase-sdk';
import { ProjectsHeader } from './components/projects';
import { connect, ConnectedProps, useSelector } from 'react-redux';

import { setUserCurrentWorkspace, fetchWorkspaces, fetchProjects, fetchDatastoreItems, store, setCurrentWorkspace } from './store';
import { Collapse, Container, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, MenuItem, MenuList, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import InboxIcon from '@material-ui/icons/Inbox';
import {Login} from './components/login';
import {Home} from './components/home';

interface IApp {
    fetchWorkspaces: Function;
    setUserCurrentWorkspace: Function;
    fetchProjects: Function;
    fetchDatastoreItems: Function;
}

const mapState = (state: any) => ({
    testState: state.testState
})

const mapToDispatch = { fetchWorkspaces, setUserCurrentWorkspace, fetchProjects, fetchDatastoreItems }

const connectore = connect(mapState, mapToDispatch);
type PropsFromRedux = ConnectedProps<typeof connectore>;
type Props = PropsFromRedux & {}

const App: React.FC<IApp> = ({ fetchWorkspaces, fetchProjects, setUserCurrentWorkspace, fetchDatastoreItems }) => {

    React.useEffect(() => 
    {
        console.log('fetch workspaces')
        fetchWorkspaces()

    }, [])
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/">
                        <Home 
                            fetchWorkspaces={fetchWorkspaces} 
                            fetchProjects={fetchProjects} 
                            setUserCurrentWorkspace={setUserCurrentWorkspace} 
                            fetchDatastoreItems={fetchDatastoreItems} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default connect(mapState, mapToDispatch)(App);

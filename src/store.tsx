import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Hexabase } from 'hexabase-sdk';
import React from 'react';
import { createStore } from 'redux';

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState: {
        testState: 'yey its working!',
        currentWorkspace: {},
        currentApplications: [],
        workspaces: [],
        ItemsRows: [],
        ItemsCols: []
    },
    reducers: {
        setCurrentWorkspace: (state, action) => {
            console.log(action)
            state.currentWorkspace = action.payload;
        },
        getWorkspaces: (state, action) => {
            console.log(action.payload)
            state.workspaces = action.payload;
        },
        setProjects: (state, action) => {
            state.currentApplications = action.payload;
        },
        getProjects: (state, action) => {
            console.log(action)
            console.log(state.currentWorkspace)
            console.log('getprojects')
        },
        setDatastoreItemsAndCols: (state, action) => {
            state.ItemsRows = action.payload.items;
            state.ItemsCols = action.payload.cols;
        }
    }
})

export const {
    getWorkspaces,
    setCurrentWorkspace,
    getProjects,
    setProjects,
    setDatastoreItemsAndCols
} = mainSlice.actions;

// fetchWorkspaces get all available workspaces
export const fetchWorkspaces = () => async (dispatch: any) => {

    let resp = await Hexabase
                    .workspaces()
                    .getWorkspacesAsync()
                    .ResultAsync<{workspaces: Array<any>}>();

    dispatch(getWorkspaces(resp.workspaces));
}

// setUserCurrentWorkspace
export const setUserCurrentWorkspace = (currentWs: any) => async (dispatch: any) => {
    dispatch(setCurrentWorkspace(currentWs));
}

// fetchProjects get all projects by workspace id
export const fetchProjects = (currentWs: any) => async (dispatch: any) => {
    let applications = await Hexabase
                            .applications()
                            .getApplications({ workspace_id: currentWs.workspace_id })
                            .ResultAsync<any>();

    dispatch(setProjects(applications));
}

const exceptId = ['_id', 'd_id', 'a_id', 'i_id', 'p_id', 'access_keys']
export const fetchDatastoreItems = (datastore: any, project_id: string) => async (dispatch: any) => {
    let items = await Hexabase.items().getItemsAsync({
        project_id: project_id,
        datastore_id: datastore.datastore_id,
        per_page: 10, 
        page: 1, 
        use_display_id: true        
    });
    var payload = {} as any;
    console.log(items)
    if(items.items.length === 0) return false;
    payload.cols = Object.keys(items.items[0]).filter(a => !exceptId.includes(a));
    payload.items = items.items;
    dispatch(setDatastoreItemsAndCols(payload))
}

export const store = configureStore({
    reducer: {
        mainSlice: mainSlice.reducer
    }
});
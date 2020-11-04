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
        workspaces: []
    },
    reducers: {
        setCurrentWorkspace: (state, action) => {
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
        }
    }
})

export const {
    getWorkspaces,
    setCurrentWorkspace,
    getProjects,
    setProjects
} = mainSlice.actions;

// export const fetchWorkspaces = () => async (dispatch: any) => 
//     Hexabase.workspaces()
//     .getWorkspacesAsync()
//     .Result()
//     .then(resp => 
//     {
//         dispatch(getWorkspaces(resp.workspaces));
//     });

export const fetchWorkspaces = () => async (dispatch: any) => {
    let resp = await Hexabase.workspaces()
    .getWorkspacesAsync()
    .Result();
    dispatch(getWorkspaces(resp.workspaces));

}
export const setUserCurrentWorkspace = (currentWs: any) => async (dispatch: any) => {
    dispatch(setCurrentWorkspace(currentWs));
}

export const fetchProjects = (currentWs: any) => async (dispatch: any) => {
    let applications = await Hexabase.applications().getApplications({ workspace_id: currentWs.workspace_id }).Result();
    dispatch(setProjects(applications));
}

export const fetchDatastoreItems = (datastore: any, project_id: string) => async (dispatch: any) => {
    // let items = await Hexabase.items().getItemsAsync({
    //     project_id: project_id,
    //     datastore_id: datastore.datastore_id,
    //     per_page: 1, 
    //     page: 1, 
    //     use_display_id: true        
    // });
    // console.log(items)
    console.log(datastore)
    // dispatch()
}

export const store = configureStore({
    reducer: {
        mainSlice: mainSlice.reducer
    }
});
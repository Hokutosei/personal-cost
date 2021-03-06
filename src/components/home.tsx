import { Collapse, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import React from "react"
import { useSelector } from "react-redux"
import { Header } from "./header"
import Paper from '@material-ui/core/Paper';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import InboxIcon from '@material-ui/icons/Inbox';

interface IApp {
    fetchWorkspaces: Function;
    setUserCurrentWorkspace: Function;
    fetchProjects: Function;
    fetchDatastoreItems: Function;
}

export const Home: React.FC<IApp> = ({ fetchWorkspaces, fetchProjects, setUserCurrentWorkspace, fetchDatastoreItems }) => {
    const {workspaces, currentWorkspace, currentApplications, itemsRows, itemsCols} = useSelector((state: any) => {
        return {
            testState: state.mainSlice.testState,
            workspaces: state.mainSlice.workspaces,
            currentWorkspace: state.mainSlice.currentWorkspace,
            currentApplications: state.mainSlice.currentApplications,
            itemsRows: state.mainSlice.ItemsRows,
            itemsCols: state.mainSlice.ItemsCols
        }
    })

    const workspaceSelectHandler = (ws: any) => {
        setUserCurrentWorkspace(ws)
        fetchProjects(ws)
    }    

    const applicationBtnHandler = (pj: any) => {
        console.log(pj)
    }

    React.useEffect(() => 
    {
        console.log('fetch workspaces')
        fetchWorkspaces()

    }, [])
    
    return (
        <div className="App" style={{flexGrow: 1}}>
            <main style={{height: '100vh'}}>
                <Grid container spacing={10} style={{width: '100%', height: '100vh', marginTop: '50px'}}>
                    <Header workspaces={workspaces} wsSelectHandler={workspaceSelectHandler}/>
                    <Grid item xs={2} style={{}}>
                        <List>
                            {currentApplications 
                                && currentApplications.map((appl: any) => (
                                    <div key={appl.application_id}>
                                        <ListItem key={appl.application_id} onClick={() => applicationBtnHandler(appl)} button>
                                            <ListItemIcon>
                                                <InboxIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={appl.name} />
                                        </ListItem>
                                        <Collapse unmountOnExit key={appl.name} in={true}>
                                            <List component="div" disablePadding>
                                                {appl.datastores &&
                                                    appl.datastores.map((dt: any) => 
                                                        {
                                                            return (
                                                                <ListItem key={dt.datastore_id} onClick={() => fetchDatastoreItems(dt, appl.application_id)} button>
                                                                    <ListItemIcon>
                                                                        <ArrowForwardIosIcon fontSize="small" />
                                                                    </ListItemIcon>
                                                                    <ListItemText primary={dt.name} />
                                                                </ListItem>                                                            
                                                            )                                                            
                                                        })
                                                }
                                            </List>
                                        </Collapse>
                                        <Divider />
                                    </div>                                
                                ))}
                        </List>
                    </Grid>
                    <Grid item xs={10}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {itemsCols && itemsCols.map((col: any) => <TableCell style={{maxWidth: '20px'}} key={col}>{col}</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {itemsRows.map((row: any) => (
                                <TableRow key={row.name}>
                                    {itemsRows && itemsRows.map((row: any) => 
                                    {
                                        return itemsCols.map((col: any) => <TableCell key={btoa(Math.random().toString(36)).substr(10, 5)}>{row[col]}</TableCell>)
                                    })}
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </main>
        </div>
    );
}
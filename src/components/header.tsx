import React, { useState } from 'react';
import { AppBar, Badge, FormControl, IconButton, MenuItem, Select, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {Hexabase} from 'hexabase-sdk';
import { ProjectsHeader } from './projects';

interface Workspaces {
    workspace_id: string;
    workspace_name: string;
}

interface WorkspaceListResp {
    workspaces: Workspaces[]
}

interface IHeader {
    workspaces: Workspaces[]; 
    wsSelectHandler: Function;
}

export const Header: React.FC<IHeader> = ({workspaces, wsSelectHandler}) => 
{
    const [wsx, setWs] = useState({workspaces});
    const wrapper = React.createRef();
    const onClicWSkHandler = (ws: any) =>
    {
        console.log(ws)
    }

    return (     
        <div>
        <AppBar position="absolute">
            <Toolbar>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                // onClick={handleDrawerOpen}
                // className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
                <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap>
                Costs Workspaces 
            </Typography>
            <IconButton color="inherit" style={{marginLeft: '10px', marginRight: '10px'}}>
                <Badge badgeContent={workspaces.length} color="secondary">
                {/* <NotificationsIcon /> */}
                </Badge>
            </IconButton>

                <FormControl>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        >
                        { workspaces &&
                            workspaces.map((ws: Workspaces) => <MenuItem 
                            onClick={(e) => wsSelectHandler(ws)}
                            value={ws.workspace_id} 
                            key={ws.workspace_id}>{ws.workspace_name}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Toolbar>
        </AppBar>
        {/* { workspaces[0].workspace_id } */}
        </div>
    );
}
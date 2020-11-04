import React, { useState } from 'react';
import {Hexabase} from 'hexabase-sdk';
import { Button, ButtonGroup } from '@material-ui/core';

interface PJHeader {
    workspace: any,
    currentApplications: Applications[]
}

interface Applications {
    name: string;
    application_id: string;
}


export const ProjectsHeader: React.FC<PJHeader> = ({workspace, currentApplications}) => {
    // const [applications, setApplications] = useState([] as Applications[])

    const wrapper = React.createRef()
    return (
        <div style={{marginTop: '100px'}}>
            test
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                {currentApplications.length > 0 && 
                    currentApplications.map(app => <Button key={app.application_id}>{app.name}</Button>)
                }
            </ButtonGroup>            

        </div>
    )    
} 
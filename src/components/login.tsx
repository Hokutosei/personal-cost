import { Button, Card, CardActions, CardContent, CardHeader, Container, Grid, Paper, TextField } from '@material-ui/core';
import { Hexabase, HxbSessionStorage } from 'hexabase-sdk';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('')
    const history = useHistory();

    const submit = () => {
        console.log(email)
        console.log(password)
        Hexabase.auth.loginAsync({ email: email, password: password }).then(resp => 
            {
                console.log(resp)
                HxbSessionStorage.Write('token', resp.token);
                history.push('/')
            });
    }

    return (
        <div style={{flexGrow: 1, marginTop: '20%'}}>
            <Grid container 
                spacing={1} 
                justify="center"
                alignItems="center"
                direction="column"
                style={{minWidth: '80%'}}>
                <Grid container item xs={7} alignItems="center">
                    <Card style={{minHeight: '400px', margin: 'auto'}}>
                        <CardHeader title="Login" style={{backgroundColor: '#33A2FF'}} />
                        <CardContent>
                            <form style={{width:'300px'}}>
                                <div>
                                    <Grid container spacing={2} direction="row">
                                        <Grid item>
                                            <TextField 
                                                onChange={(e) => { setEmail(e.target.value) }}
                                                required 
                                                id="standard-required" 
                                                label="Email"
                                                style={{width: "300px"}} />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                required
                                                onChange={(e) => { setPass(e.target.value) }}
                                                id="standard-required"
                                                label="Password"
                                                type="password"
                                                style={{width: "300px"}} />

                                        </Grid>
                                    </Grid>                                    
                                </div>
                            </form>
                        </CardContent>
                        <CardActions>
                            <Button onClick={submit} color="primary" variant="outlined">Login</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}
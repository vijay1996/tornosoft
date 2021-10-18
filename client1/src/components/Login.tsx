import React from 'react'
import { Typography, Paper, TextField, Button, Grid, Link } from "@material-ui/core"
import { formStyle } from "../mainStyle";

const formStyleLocal:{[k:string]: object} = formStyle 

interface propType {
    setDisplay(arg: string): void;
}

const Login: React.FC<propType> = (props) => {
    return (
        <Paper style={formStyleLocal.container}>
            <div style={formStyleLocal.header}>
                <Typography variant="h2">Login</Typography>
            </div>
            <br />
            <div>
                <TextField style={formStyleLocal.fields} size="small" label="Email" variant="outlined" name="email" type="email" />
                <br /><br />
                <TextField style={formStyleLocal.fields} size="small" label="Password" variant="outlined" name="password" type="password" />
                <br /><br />
                <div>
                    <Grid container>
                        <Grid item sm={12}>
                            <Button style={formStyleLocal.button}>Submit</Button>
                        </Grid>
                        <br />
                        <br />
                        <br />
                        <Grid item sm={12}>
                            <Link onClick={()=>props.setDisplay('signup')} style={formStyleLocal.link}>Do not have an account?</Link>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <br />
        </Paper>
    )
}

export default Login;
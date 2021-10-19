import React, { useState } from 'react'
import { Typography, Paper, TextField, Button, Grid, Link } from "@material-ui/core"
import { formStyle } from "../mainStyle";
import { EventType, ResponseDataType } from '../types';
import { apiPostCall } from '../function';

const formStyleLocal:{[k:string]: object} = formStyle 

interface propType {
    setDisplay(arg: string): void;
} 

const Login: React.FC<propType> = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = (event: EventType) => {
        switch (event.target.name){
            case 'email':
                setEmail(event.target.value as string)
                break
            case 'password':
                setPassword(event.target.value as string)
                break
        }
    }

    const handleSubmit = async () => {
        let user = {
            email,
            password
        }
        let data: ResponseDataType = await apiPostCall("http://localhost:8000/login", user)
        alert(JSON.stringify(data))
    }

    return (
        <Paper style={formStyleLocal.container}>
            <div style={formStyleLocal.header}>
                <Typography variant="h2">Login</Typography>
            </div>
            <br />
            <div>
                <TextField style={formStyleLocal.fields} onChange={(e)=>handleChange(e)} size="small" label="Email" variant="outlined" name="email" type="email" />
                <br /><br />
                <TextField style={formStyleLocal.fields} onChange={(e)=>handleChange(e)} size="small" label="Password" variant="outlined" name="password" type="password" />
                <br /><br />
                <div>
                    <Grid container>
                        <Grid item sm={12}>
                            <Button onClick={()=>handleSubmit()} style={formStyleLocal.button}>Submit</Button>
                        </Grid>
                        <br /><br /><br />
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
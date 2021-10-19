import React, { useState } from 'react'
import { Typography, Paper, TextField, Button, Grid, Link } from "@material-ui/core"
import { formStyle, errorStyle } from "../mainStyle";
import { EventType } from '../types';
import { apiPostCall } from '../function';

const formStyleLocal:{[k:string]: object} = formStyle 

type Data = {
    error?:string,
    response?:string
}

interface propType {
    setDisplay(arg: string): void;
}

const Signup: React.FC<propType> = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')

    const handleChange = (event: EventType) => {
        switch (event.target.name) {
            case 'name':
                setName(event.target.value as string)
                break;
            case 'email':
                setEmail(event.target.value as string)
                break;
            case 'confirm':
                setConfirm(event.target.value as string)
                break;
            case 'password':
                setPassword(event.target.value as string)
                break;
        }
    }

    const handleSubmit = async () => {
        const user = {
            name,
            email,
            password
        }

        const data: Data = await apiPostCall("http://localhost:8000/signup", user)

        if (data?.error) {
            setError(data.error)
        } else if(data?.response) {
            alert(data.response)
        }
    }

    return (
        <Paper style={formStyleLocal.container}>
            <div style={formStyleLocal.header}>
                <Typography variant="h2">Sign Up</Typography>
            </div>
            <br />
            <div>
            <TextField style={formStyleLocal.fields} size="small" label="Name" variant="outlined" name="name" type="text" onChange={(event) => handleChange(event)} />
                <br /><br />
                <TextField style={formStyleLocal.fields} size="small" label="Email" variant="outlined" name="email" type="email" onChange={(event) => handleChange(event)} />
                <br /><br />
                <TextField style={formStyleLocal.fields} size="small" label="Password" variant="outlined" name="password" type="password" onChange={(event) => handleChange(event)} />
                <br /><br />
                <TextField style={formStyleLocal.fields} size="small" label="Confirm password" variant="outlined" name="confirm" type="password" onChange={(event) => handleChange(event)} />
                <br /><br />
                <div>
                    <Grid container>
                        <Grid item sm={12}>
                            {error?.length ? <Typography style={errorStyle.message} >{error}</Typography> : ""}
                        </Grid>
                        <br /><br />
                        <Grid item sm={12}>
                            <Button onClick={ ()=> {handleSubmit()} } style={formStyleLocal.button}>Submit</Button>
                        </Grid>
                        <br /><br /><br />
                        <Grid item sm={12}>
                            <Link onClick={()=>props.setDisplay('login')} style={formStyleLocal.link}>Already have an account?</Link>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <br />
        </Paper>
    )
}

export default Signup;
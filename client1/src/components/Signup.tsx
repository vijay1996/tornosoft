import React, { useState } from 'react'
import { Typography, Paper, TextField, Button, Grid, Link } from "@material-ui/core"
import { formStyle, errorStyle } from "../mainStyle";

const formStyleLocal:{[k:string]: object} = formStyle 

interface propType {
    setDisplay(arg: string): void;
}

const Signup: React.FC<propType> = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')

    const handleChange = (event: any) => {
        switch (event.target.name) {
            case 'name':
                setName(event.target.value)
                break;
            case 'email':
                setEmail(event.target.value)
                break;
            case 'confirm':
                setConfirm(event.target.value)
                break;
            case 'password':
                setPassword(event.target.value)
                break;
        }
    }

    const handleSubmit = () => {
        const user = {
            name,
            email,
            password
        }
        if (password === confirm) {
            fetch("http://localhost:8000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }).then((response) => {
                if (!response.ok) return response.json().then(err => Promise.reject(err))
                alert(response)
            }).catch((err)=>{
                setError(err.error)
            })
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
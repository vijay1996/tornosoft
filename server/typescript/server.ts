import express = require('express')
import cors = require('cors')
import mongoose = require('mongoose')
import bodyParser = require('body-parser')

import { user } from './types'
import { main, userSchema } from './models'
import { returnUser } from './functions'
import { errors } from './errors'

const app = express()
app.use(bodyParser());

const corsOptions = {
    origin: '*'
}

app.use(cors(corsOptions))
app.use('/static', express.static(__dirname + '/client/build/static'))

main().catch(err => console.log(err));

const PORT = 8000

app.get('/', async(req, res) => {
    res.sendFile('/client/build/index.html',{root: __dirname})
})

//this is the signup module
app.post('/signup', async (req, res) => {
    const userInfo: user = req.body
    const users: string | user[] = await returnUser(userInfo)
    console.log(users)
    if (users.length === 0) {
        const User:any = mongoose.model('user', userSchema)
        const userData = new User(userInfo)
        await userData.save()
        res.send({response: "success"})
    } else {
        res.status(500).send({error: errors.english.userExists})
    }
})

app.post('/login', async(req,res) => {
    const userInfo: user = req.body
    const users: string | user[] = await returnUser(userInfo)
    // if(users && typeof users === user[] && users.length) {
    //     console.log(users)
    // }
})

app.get('/showDocuments', (req, res) => {
    const Users = mongoose.model('user', userSchema)
    Users.find({}, (err, users) => {
        if(err) res.send(err)
        res.send(users)
    })
})

app.listen(PORT, () => {
    console.log(`[server]: running at http://localhost:${PORT}`)
})

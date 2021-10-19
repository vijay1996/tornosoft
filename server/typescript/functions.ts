import mongoose = require('mongoose')
import { userSchema } from './models'
import { user } from './types'

type Error = {
    error: string
}

export const returnUser = async (userInfo: user) => {
    let returnData: user[] = []
    let error: string = ''
    const Users:any = mongoose.model('user', userSchema)
    await Users.find({email: userInfo.email}).then((user: user[]) => {
        returnData = [...user]
    }).catch((err: Error)=>{
        error = err.error
    })
    console.log(returnData)
    if(returnData.length) {
        return returnData
    } else {
        return error
    }
}
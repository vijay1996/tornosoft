import mongoose = require('mongoose')
import { userSchema } from './models'
import { user } from './types'

export const returnUser = async (userInfo: user) => {
    let returnData: user[] = []
    let error = ''
    const Users:any = mongoose.model('user', userSchema)
    await Users.find({email: userInfo.email}).then((user: user[]) => {
        returnData = [...user]
    }).catch((err: string)=>{
        error = err
    })
    if(returnData.length) {
        return returnData
    } else {
        return error
    }
}
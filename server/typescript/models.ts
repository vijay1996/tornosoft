import mongoose = require('mongoose')

export async function main() {
    await mongoose.connect("mongodb://localhost:27017/users")
}

export const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
// ? This file will be our 'data model': which is a representation we use to interact more
// ? easily with data stored in our database, and to constrain/validate that data.

import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const Userschema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }, 
})

Userschema.pre('save', function hashPassword(next) {
  this.password = bcrypt.hashSync(this.password,bcrypt.genSaltSync())
  next()
})

Userschema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('User', Userschema)


import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import validator from "validator";
import uniqueValidator from 'mongoose-unique-validator'

const Userschema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true,
  },

  email: { 
    type: String, 
    required: true, 
    unique: true,
    validate: (email) => validator.isEmail(email),
  },
  
  password: { 
    type: String, 
    required: true,
    validate: (password) => /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password),
  }, 
})

Userschema.pre('save', function hashPassword(next) {
  this.password = bcrypt.hashSync(this.password,bcrypt.genSaltSync())
  next()
})

Userschema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

Userschema.plugin(uniqueValidator)
export default mongoose.model('User', Userschema)
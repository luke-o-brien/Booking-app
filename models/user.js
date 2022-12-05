

import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import validator from "validator";
import uniqueValidator from 'mongoose-unique-validator'
import Bookingschema from "../models/Booking.js"

// const Bookingschema = new mongoose.Schema({
//   serviceId: { type: String, required: true },
//   userId: { type: String, required: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, validate: (email) => validator.isEmail(email) } ,
//   phoneNumber: { type: String, required: true },
//   nationality: { type: String, required: true }, 
// })


const Userschema = new mongoose.Schema({
  name: { 
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
  bookings: [Bookingschema.schema],
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
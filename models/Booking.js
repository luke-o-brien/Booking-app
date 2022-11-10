import mongoose from "mongoose";
import validator from "validator";
import { nanoid } from "nanoid";

const Bookingschema = new mongoose.Schema({
  serviceId: { type: String, required: true },
  customerref: { type: String, required: true, default: () => nanoid(7), unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, validate: (email) => validator.isEmail(email) } ,
  phoneNumber: { type: String, required: true },
  nationality: { type: String, required: true }, 
})

export default mongoose.model('Booking', Bookingschema)
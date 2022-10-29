import mongoose from "mongoose";
import validator from "validator";

const Bookingschema = new mongoose.Schema({
  serviceId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, validate: (email) => validator.isEmail(email) } ,
  phoneNumber: { type: String, required: true },
  nationality: { type: String, required: true }, 
})

export default mongoose.model('Booking', Bookingschema)
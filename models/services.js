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

const Serviceschema = new mongoose.Schema({
  serviceNumber: { type: String, required: true },
  operator: { type: String, required: true },
  date: { type: String, required: true },
  DepartureDate: { type: String, required: true },
  ArrivalDate: { type: String, required: true },
  DepartureTime: { type: String, required: true },
  ArrivalTime: { type: String, required: true },
  duration: { type: Number, required: true },
  BusType: { type: String, required: true },
  SeatNumber: { type: Number, required: true },
  Origin: { type: String, required: true },
  Destination: { type: String, required: true },
  facilities: { 
    aircondition: { type: Boolean, required: false },
    poweroutlet: { type: Boolean, required: false },
    accesible: { type: Boolean, required: false },
    usb: { type: Boolean, required: false },
    wifi: { type: Boolean, required: false },
    wc: { type: Boolean, required: false },

  }, 
  bookings: [Bookingschema],
})

export default mongoose.model('Service', Serviceschema)


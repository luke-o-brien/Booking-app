import mongoose from "mongoose";


const Serviceschema = new mongoose.Schema({
  serviceNumber: { type: String, required: true },
  operator: { type: String, required: true },
  date: { type: String, required: true },
  DepartureDate: { type: String, required: true },
  ArrivalDate: { type: String, required: true },
  DepartureTime: { type: String, required: true },
  ArrivalTime: { type: String, required: true },
  BusType: { type: String, required: true },
  SeatNumber: { type: Number, required: true },
  Origin: { type: String, required: true },
  Destination: { type: String, required: true },
})

export default mongoose.model('Service', Serviceschema)


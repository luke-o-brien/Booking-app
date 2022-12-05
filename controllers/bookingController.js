import Service from "../models/services.js"
//import Booking from "../models/Booking.js"
//import services from "../models/services.js"
import User from "../models/user.js"

async function createBooking(req, res) {
  try {
    const serviceId = req.params.serviceId
    // const user = req.currentUser
    const booking = req.body
    const service = await Service.findById(serviceId)
    if (!service) {
      return res.json({ message: 'No service found' })
    }

    // booking.user = user
    service.bookings.push(booking)

    const savedService = await service.save()
    res.json(savedService)
    //console.log(savedService)
  } catch (e) {
    console.log(e)
    res.json({ message: "There was a problem booking this service" })
  } 
}




async function getBookingById(req, res) {
  try {
    const id = req.params.serviceId
    console.log(`Service Id: ${id}`)
    const bookingId = req.query.bookingId
    console.log(` Booking Id: ${bookingId}`)
    const service = await Service.findById(id)
    if (!service) { 
      return res.json({ message: "Service was not found" }) 
    }
    const Booking = await Service.find( { bookings: { $elemMatch: { _id: bookingId } } } )
    res.json(Booking)
    console.log(Booking)
  
  } catch (e) {
    res.json({ message: 'There was problem trying to get this service please try again later' })
    console.log(e)
  }
}



async function deleteBooking(req,res) {
  try {
    const serviceId = req.params.serviceId
    const bookingId = req.body.bookingId
    console.log(bookingId)

    const Services = await Service.findById(serviceId)
    console.log(Services)
    if (!Services) return res.json({ message: "Booking not found" })
    await Service.findOneAndUpdate( { _id: serviceId } , { $pull: { bookings: { _id: bookingId  } } } )

    res.sendStatus(204)
  } catch (e) {
    res.status(422).json({ message: "This BookingID is in an invalid format." })
    console.log(e)
  } 
}


async function createCustomerBooking(req, res) {
  try {
    const userId = req.params.userId
    //console.log(userId)
    // const user = req.currentUser
    const booking = req.body
    const customer = await User.findById(userId)
    console.log(customer)
    if (!customer) {
      return res.json({ message: 'No service found' })
    }

    // booking.user = user
    customer.bookings.push(booking)

    const savedService = await customer.save({ validateBeforeSave: false })
    res.json(savedService)
  } catch (e) {
    console.log(e)
    res.json({ message: "There was a problem booking this service" })
  } 
}

export default {
  createBooking,
  deleteBooking,
  getBookingById,
  createCustomerBooking,
}
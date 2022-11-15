import Service from "../models/services.js"
import Booking from "../models/Booking.js"

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
    console.log(savedService)
  } catch (e) {
    res.json({ message: "There was a problem booking this service" })
  }
}


async function deleteBooking(req,res) {
  try {
    const serviceId = req.params.serviceId
    const bookingId = req.body.bookingId
    console.log(bookingId)

    const BookingToDelete = await Service.findById(serviceId)
    const toDelete = BookingToDelete.bookings

    if (!BookingToDelete) return res.json({ message: "Booking not found" })

    await BookingToDelete.bookings.findByIdAndDelete(bookingId)
    
    res.sendStatus(204)
  } catch (e) {
    res.status(422).json({ message: "This BookingID is in an invalid format." })
    console.log(e)
  } 
}
export default {
  createBooking,
  deleteBooking,
}
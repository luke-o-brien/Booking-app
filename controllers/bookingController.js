import Service from "../models/services.js"

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

export default {
  createBooking,
}
import Service from "../models/services.js"

async function createBooking(req, res) {
  try {
    // ! We need to provide the pokemon ID we're commenting on.
    const serviceId = req.params.serviceId
    // ! We also need to get the user/user ID for the user commenting.
    // const user = req.currentUser
    // ! Grab the info from the request body.
    const booking = req.body
    // ! Get the pokemon we're comment on.
    const service = await Service.findById(serviceId)
    // ! Handle it if no pokemon is found
    if (!service) {
      return res.json({ message: 'No pokemon found' })
    }
    // ! Push the new comment to the comments array
    // comment.user = user
    // ! Pushing our new comment to this pokemon does
    // ! NOT update it in the database YET. 
    service.bookings.push(booking)

    // ! So we need to save it to the database.
    const savedService = await service.save()
    // ! Sending back the comment
    res.json(savedService)
  } catch (e) {
    res.json({ message: "There was a problem booking this service" })
  }
}

export default {
  createBooking,
}
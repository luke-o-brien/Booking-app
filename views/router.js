// ? Applications routes will live in here.

import express from "express"
import controller from "../controllers/controller.js" 
import servicecontroller from "../controllers/serviceController.js"
import bookingController from "../controllers/BookingController.js"
import secureRoute from "../middleware/secureRoute.js"


const router = express.Router()

router.route("/users")
  .get(controller.getUsers)

router.route("/register")
  .post(controller.register)

router.route("/login")
  .post(controller.login)

router.route("/users/:userId")
  .put(secureRoute, controller.updatePassword)

router.route("/users/:userId/authorize")
  .post(secureRoute, controller.authorize)

router.route("/services")
  .get(servicecontroller.getServices)
  

router.route("/servicesbysearch")
  .get(servicecontroller.getServicesbysearch)

router.route("/services/:serviceId")
  .get(servicecontroller.getServiceByid)
  .put(servicecontroller.updateServicedetails)


router.route("/services/:serviceId/bookings")
  .post(bookingController.createBooking)
  .delete(bookingController.deleteBooking)
  .get(bookingController.getBookingById)


export default router
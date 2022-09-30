// ? Applications routes will live in here.

import express from "express"
import controller from "../controllers/controller.js" 
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
export default router
// ? Applications routes will live in here.

import express from "express"
import controller from "../controllers/controller.js" 


const router = express.Router()

router.route("/users")
  .get(controller.getUsers)

router.route("/register")
  .post(controller.register)
export default router
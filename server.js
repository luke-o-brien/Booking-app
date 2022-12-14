import express from "express"
import { connectToDb, disconnectDb } from "./db/helpers.js"
import logger from "./middleware/logger.js"
import router from "./views/router.js"
import errorHandler from "./middleware/errorHandler.js";

import mongoSanitize from 'express-mongo-sanitize';

async function startServer() {
  try {
    const app = express()

    app.use(express.json())

    app.use(mongoSanitize());

    app.use(logger)

    app.use('/api', router)

    app.use(errorHandler)

    app.use(router)
  
    await connectToDb()

    console.log('Connected to DB!')

    app.listen(4000, () => console.log("🤖 Hello express!"))
  } catch (e) {
    await disconnectDb()
  }
}

startServer()

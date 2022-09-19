// ? Our server file is responsible for setting up and running our express server,
// ? with all the configuration that it needs to work.

import express from "express"
import { connectToDb } from "./db/helpers.js"
import router from "./views/router.js"
import seed from "./db/seed.js"

// ! Moved my code into a function!
async function startServer() {
  const app = express()

  app.use(express.json())

  app.use(router)

  // ! Before I start listening on port 4000, I'm going to connect to MongoDB.
  await connectToDb()
  // seed()
  console.log('Connected to DB!')

  app.listen(4000, () => console.log("🤖 Hello express!"))
}

startServer()

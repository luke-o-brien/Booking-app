

import express from "express"
import { connectToDb } from "./db/helpers.js"
import router from "./views/router.js"
// import seed from "./db/seed.js"

async function startServer() {
  const app = express()

  app.use(express.json())

  app.use(router)


  await connectToDb()
  // seed()
  console.log('Connected to DB!')

  app.listen(4000, () => console.log("🤖 Hello express!"))
}

startServer()

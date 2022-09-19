// ? A file that will be used to 'seed' our database with initial data.

import mongoose from 'mongoose'
// ! Import both the data AND the model
import User from '../models/user.js'
import userData from './data/data.js'
import { connectToDb, disconnectDb } from './helpers.js'

async function seed() {
  // ! 1) Connect to the database
  // ? Always starts with mongodb://mongodb://127.0.0.1:27017/
  // ? Then you give it the name of the db to connect to (you make this up.)
  await connectToDb()
  // ! 1.5) Clear the database
  mongoose.connection.db.dropDatabase()
  // ! 2) Celebrate we've connected
  console.log('Connected to the database! 🌱')
  // ! 3) Seed our data!
  const user = await User.create(userData)
  console.log(user)
  // ! 3) Disconnect from the database
  await disconnectDb()
  console.log('Goodbye 🌱')
}

export default seed
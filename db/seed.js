

import mongoose from 'mongoose'
import User from '../models/user.js'
import userData from './data/data.js'
import { connectToDb, disconnectDb } from './helpers.js'

async function seed() {

  await connectToDb()
  mongoose.connection.db.dropDatabase()
  console.log('Connected to the database! 🌱')
  const user = await User.create(userData)
  console.log(user)
  await disconnectDb()
  console.log('Goodbye 🌱')
}

export default seed()


import mongoose from 'mongoose'
import User from '../models/user.js'
import Service from '../models/services.js'
import userData from './data/data.js'
import { connectToDb, disconnectDb } from './helpers.js'
import serviceData from './data/serviceData.js'

async function seed() {

  await connectToDb()
  mongoose.connection.db.dropDatabase()
  console.log('Connected to the database! 🌱')
  const user = await User.create(userData)
  const service = await Service.create(serviceData)
  console.log(service)
  console.log(user)
  await disconnectDb()
  console.log('Goodbye 🌱')
}

export default seed()
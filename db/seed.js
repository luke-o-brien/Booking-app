

import mongoose from 'mongoose'
import User from '../models/user.js'
import Service from '../models/services.js'
import userData from './data/data.js'
import { connectToDb, disconnectDb } from './helpers.js'
import serviceData from './data/serviceData.js'
import serviceDatareturn from './data/serviceDatareturn.js'

async function seed() {

  await connectToDb()
  mongoose.connection.db.dropDatabase()
  console.log('Connected to the database! 🌱')
  const user = await User.create(userData)
  const service = await Service.create(serviceData)
  const services = await Service.create(serviceDatareturn)
  console.log(service)
  console.log(user)
  console.log(services)
  await disconnectDb()
  console.log('Goodbye 🌱')
}

export default seed()
import Service from '../models/services.js'

async function getServices(req, res) {
  const allServices = await Service.find()
  res.json(allServices)
}

export default {
  getServices,
}
import Service from '../models/services.js'

async function getServices(req, res) {
  const allServices = await Service.find()
  res.json(allServices)
}

async function getServiceByid(req, res) {
  try {
    const id = req.params.serviceId
    const service = await Service.findById(id)
    if (!service) return res.json({ message: "Service was not found" })

    res.json(service)
  
  } catch (e) {
    res.json({ message: 'There was problem trying to get this service please try again later' })
  }
}
async function getServicesbysearch(req, res) {
  try {
    const date = req.query.date
    console.log(date)
    const services = await Service.find( { date: date } )
    if (!services) return res.json({ message: "no services on that date" })
    res.json(services)
  } catch (err) {
    res.json({ message: "there was a problem getting services" }) 
  }
}

async function updateServicedetails(req,res) {
  try {
    const serviceId = req.params.serviceId
    const newService = req.body

    const serviceToUpdate = await Service.findById(serviceId)

    if (!serviceToUpdate) return res.json({ message: "Service not found" })

    const updatedService = await Service.findByIdAndUpdate(serviceId, newService, { new: true })

    res.status(201).json(updatedService)
  } catch (e) {
    if (e.path === "_id") {
      res.status(422).json({ message: "This Service ID is in an invalid format." })
    } else {
      res.status(422).json({ message: 'Service has missing or invalid fields.' })
    }
  }
}


export default {
  getServices,
  getServiceByid,
  getServicesbysearch,
  updateServicedetails,
}
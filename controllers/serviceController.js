import Service from '../models/services.js'

async function getServices(req, res) {
  const allServices = await Service.find()
  res.json(allServices)
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
export default {
  getServices,
  getServicesbysearch,
}
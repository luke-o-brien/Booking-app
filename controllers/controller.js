import User from "../models/user.js"

async function getUsers(req, res) {
  const allUsers = await User.find()
  res.json(allUsers)
}

async function register(req, res) {
  const body = req.body
  try {
    const user = await User.create(body)
    res.status(201).json(user)
  } catch (err) {
    res.status(422).json({ message: 'User has missing or invalid fields.' })
  }
}

export default {
  getUsers,
  register,
}
import User from "../models/user.js"
import bcrypt from 'bcrypt'

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


async function login(req, res) {
  try {

    const user = await User.findOne({ email: req.body.email })
    const isValidPw = user.validatePassword(req.body.password)

    if (isValidPw) {
      res.json({ message: "Login successful!" } )
    } else {
      res.status(400).json({ message: "Login failed! step one" } )
    }
  } catch (err) {
    res.status(400).json({ message: "Login failed!" } )
  }
}

async function updatePassword(req, res) {
  try {
    const userId = req.params.userId
    console.log("User id: " + userId)
    const newPassword = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync())
    console.log("newPassword: " + newPassword)

    const userToUpdate = await User.findById(userId)

    if (!userToUpdate) return res.json({ message: "not a registered user" })

    const updatedPassword = await User.findByIdAndUpdate(userId, newPassword, { new: true })

    res.status(201).json(updatedPassword)
  } catch (e) {
    if (e.path === "_id") {
      res.status(422).json({ message: "This user ID is in an invalid format." })
    } else {
      res.status(422).json({ message: 'user has missing or invalid fields.' })
    }
  }
}

export default {
  getUsers,
  register,
  login,
  updatePassword,
}
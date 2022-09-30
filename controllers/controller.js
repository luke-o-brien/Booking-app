import User from "../models/user.js"
import bcrypt from 'bcrypt'


import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'

async function getUsers(req, res) {
  const allUsers = await User.find()
  res.json(allUsers)
}

async function register(req, res) {
  const body = req.body
  try {
    if (body.password !== body.passwordConfirmation) {
      return res.status(422).json({ message: "Passwords do not match." })
    }

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
      const token = jwt.sign(
        { userId: user._id },
        secret, 
        { expiresIn: '24h' }
      )

      res.json({ message: "Login successful!", token } )
    } else {
      res.status(400).json({ message: "Password is incorrect" } )
    }
  } catch (err) {
    res.status(400).json({ message: "No user with that email address" } )
  }
}

async function updatePassword(req, res) {
  try {
    const userId = req.params.userId
    console.log("User id: " + userId)
    const newPassword = await bcrypt.hashSync(req.body.password,bcrypt.genSaltSync())
    console.log("newPassword: " + newPassword)
    
    const userToUpdate = await User.findById(userId)

    if (!userToUpdate) { 
      return res.json({ message: "not a registered user" })
    } else {
      const updatedPassword = await User.findByIdAndUpdate(userId, { password: newPassword } , { new: true })
      console.log("updated Password: " + updatedPassword)
      res.status(201).json(updatedPassword)
    }
  } catch (e) {
    if (e.path === "_id") {
      res.status(422).json({ message: "This user ID is in an invalid format." })
    } else {
      res.status(422).json({ message: 'user has missing or invalid fields.' })
    }
  }
}


async function authorize(req, res) {
  try {

    const userId = req.params.userId
    const user = await User.findById(userId)
    const isValidPw = user.validatePassword(req.body.password)

    if (isValidPw) {
      res.json({ message: "account authorized" , status: true  } )
    } else {
      res.status(400).json({ message: "Password is incorrect", status: false } )
    }
  } catch (err) {
    res.status(400).json({ message: "No user with that email address", status: false } )
  }
}

export default {
  getUsers,
  register,
  login,
  updatePassword,
  authorize,
}
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'
import User from '../models/user.js'

export default function secureRouter (req, res, next) {

  const rawtoken = req.headers.authorization

  if (!rawtoken || !rawtoken.startsWith('Bearer')) {
    return res.status(401).json({ message: "unauthorized" })
  }

  const token = rawtoken.replace('Bearer ', '')

  jwt.verify(token, secret, async(err, payload) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const user = await User.findById(payload.userId)

    if (!user) {
      return res.status(401).json({ message: "unauthorized" })
    }
    req.currentUser = user

    next()
  })
}
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


async function login(req, res) {
  try {
    // ! Hash the password the user is trying to log in with
    // ! and compare it to the one in the database they registered with!!!

    // ! Finds the user for the email
    const user = await User.findOne({ email: req.body.email })
    // ! This will check the hashes are the same 
    const isValidPw = user.validatePassword(req.body.password)

    if (isValidPw) {
      res.json({ message: "Login successful!" } )
    } else {
      res.status(400).json({ message: "Login failed!" } )
    }
  } catch (err) {
    res.status(400).json({ message: "Login failed!" } )
  }

}
export default {
  getUsers,
  register,
  login,
}
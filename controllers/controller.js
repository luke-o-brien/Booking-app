// ? The controller contains the code to work with our data and send it back to the user.
// ? It's the part that can interact and manipulate our data. 


import User from "../models/user.js"

async function getUsers(req, res) {
  const allUsers = await User.find()
  res.json(allUsers)
}

export default {
  getUsers,
}
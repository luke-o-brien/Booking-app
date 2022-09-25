export default function errorHandler(err, req, res, next) {

  if (err.name === 'ValidationError') {
    const customErrors = {}
    
    console.log(err.errors)

    for (const key in err.errors) {
      customErrors[key] = err.errors[key].message
    }

    console.log(customErrors)

    return res.status(422).json({ 
      message: 'User has missing or invalid fields.',
      errors: customErrors,
    })
  }


  res.status(500).json({ message: "There was an error" })
  next()

}
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const User = require('../models/User')

module.exports = function () {

  router.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users)
  })

  router.post('/', async (req, res) => {
    try {
      const {body} = req
      const {username, name, password} = body

      // Encriptando el password con bcrypt
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)
      const user = new User({
        username,
        name,
        passwordHash
      })

      const savedUser = await user.save()
      res.status(201).json(savedUser)
    } catch (error) {
      console.error(error)
      res.status(400).json(error)
    }
    
  })

  return router
} 
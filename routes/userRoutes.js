const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const User = require('../models/User')

module.exports = function () {

  router.get('/', async (req, res) => {
    const users = await User.find({}).populate('notes', {
      content: 1,
      date: 1
      // important: true,
      // user: "6056d99908e14d181829f5d6",
      // id: "6056d9c508e14d181829f5d7"
    }) // .populate hace que se muestren las notas en el usuario! y los parametros es para devolver solo lo que quieres
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
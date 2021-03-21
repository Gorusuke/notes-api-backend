require('./mongo')
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const noteRoutes = require('./routes/notesRoutes')
const userRoutes = require('./routes/userRoutes')

app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes())
app.use('/', noteRoutes())

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`)
})

module.exports = {app, server}
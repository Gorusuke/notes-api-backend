require('./mongo')
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./routes/notes')

app.use(cors())
app.use(express.json())

app.use('/', routes())

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`)
})

module.exports = {app, server}
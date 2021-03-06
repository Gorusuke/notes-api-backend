const express = require('express')
const router = express.Router()

express().use(express.json())

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

module.exports = function () {
  router.get('/', (req, res) => {
    res.send('<h1>Holissss</h1>')
  })

  router.get('/api/notes', (req, res) => {
    res.json(notes)
  })

  router.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  })

  router.post('/api/notes', (req, res) => {
    const note = req.body
    if (!note || !note.content) {
      res.status(400).json({
        error: 'note.content is missing'
      })
    }

    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
      id: maxId + 1,
      content: note.content,
      important: typeof note.important !== 'undefined' ? note.important : false,
      date: new Date().toISOString()
    }

    notes = [...notes, newNote]

    res.status(201).json(newNote)
  })

  router.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
  })

  return router
}

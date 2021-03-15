const express = require('express')
const router = express.Router()
const Note = require('../models/Note')

module.exports = function () {
  router.get('/', (req, res) => {
    // Obteniendo la pagina principal
    res.send('<h1>Welcome.!</h1>')
  })

  router.get('/api/notes', (req, res) => {
    // Obteniendo todas las notas
    Note.find({}).then((result) => res.json(result))
  })


  router.get('/api/notes/:id', (req, res, next) => {
    const {id} = req.params
    // Obteniendo las notas por id
    Note.findById(id).then(note => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    }).catch(err => next(err))
  })

  router.post('/api/notes', (req, res) => {
    const note = req.body
    if (!note || !note.content) {
      res.status(400).json({error: 'note.content is missing'})
    }
    // Creando la nueva nota a guardar
    const newNote = new Note({
      content: note.content,
      important: typeof note.important !== 'undefined' ? note.important : false,
      date: new Date().toISOString()
    })
    // Guardando la nueva nota
    newNote.save()
      .then((saveNote) => res.status(201).json(saveNote))

  })

  router.put('/api/notes/:id', (req, res, next) => {
    const {id} = req.params
    const note = req.body

    const newNoteInfo = {
      content: note.content,
      important: note.important,
    }
    // Actualizando por Id y mostrando el nuevo objeto
    Note.findByIdAndUpdate(id, newNoteInfo, {new: true})
      .then((result) => res.json(result))
      .catch(err => next(err))
  })

  router.delete('/api/notes/:id', (req, res, next) => {
    const {id} = req.params
    // Eliminando por id
    Note.findByIdAndDelete(id)
      .then(() => res.status(204).end())
      .catch(err => next(err))
  })

  router.use((req, res, next) => {
    res.status(404).end()
  })

  router.use((err, req, res, next) => {
    console.error(err)

    if(err){
      res.status(400).send({error: 'El ID esta mal'})
    } else {
      res.status(500).end()
    }
  })

  return router
}

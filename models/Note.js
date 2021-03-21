const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
  // Relacionando las notas con el usuario 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // Añadiendo el mismo _id a id
    returnedObject.id = returnedObject._id
    // Eliminando _id y __v
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note
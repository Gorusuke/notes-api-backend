const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
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

// Note.find({}).then(result => {
//     console.log(result)
//     mongoose.connection.close()

// })

// const note = new Note({
//     content: 'Mongodb is awesome',
//     date: new Date(),
//     important: true
// })

// note.save()
//     .then((result) => {
//         console.info(result)
//         mongoose.connection.close()
//     }).catch(err => {
//         console.info(err)
//     })

module.exports = Note
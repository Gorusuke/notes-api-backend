const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: String,
  name: String,
  passwordHash: String,
  // Relacionando el usuario con las notas
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // Añadiendo el mismo _id a id
    returnedObject.id = returnedObject._id
    // Eliminando _id y __v
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
  }
})

const User = model('User', userSchema)

module.exports = User
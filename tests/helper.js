const supertest = require('supertest')
const {app} = require('../index')

const api = supertest(app)


const initialNotes = [
  {
    content: 'Aprendiendo Fullsatck Js con midudev',
    important: true,
    date: new Date() 
  },
  {
    content: 'Probando el test con Node',
    important: true,
    date: new Date() 
  }
]

const getAllContentFromNotes = async () => {
  const response = await api.get('/api/notes')
  const content = response.body.map(res => res.content)
  return {content, response}
}

module.exports = {api, initialNotes, getAllContentFromNotes}
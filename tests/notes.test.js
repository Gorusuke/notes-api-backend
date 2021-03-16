const moongose = require('mongoose')
const {server} = require('../index')
const Note = require('../models/Note')
const {api, initialNotes, getAllContentFromNotes} = require('./helper')


beforeEach(async () => {
  await Note.deleteMany({})

  for (const note of initialNotes) {
    const noteObject = new Note(note)
    await noteObject.save()    
  }
})

test('notes are returned as json ', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-type', /application\/json/)
})

test('there are two notes ', async () => {
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(initialNotes.length)
})


test('the second note is about Node ', async () => {
  const {response, content} = await getAllContentFromNotes()
  expect(content).toContain('Probando el test con Node')
})

test('a valid note can be added ', async () => {
  const newNote = {
    content: 'Probando el test con Node',
    important: true
  }
  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-type', /application\/json/)

  const {response, content} = await getAllContentFromNotes()
  expect(response.body).toHaveLength(initialNotes.length + 1)
  expect(content).toContain(newNote.content)
})

test('note without a content is not added', async () => {
  const newNote = {
    important: true
  }
  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(initialNotes.length)
})

test('a note can be deleted', async () => {
  const { response: firstResponse } = await getAllContentFromNotes()
  const { body: notes } = firstResponse
  const noteToDelete = notes[0]

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(404)

  const { contents, response: secondResponse } = await getAllContentFromNotes()
  expect(secondResponse.body).toHaveLength(initialNotes.length - 1)
  expect(contents).toBeUndefined()
})

test('a note that has an invalid id can not be deleted', async () => {
  await api
    .delete('/api/notes/1234')
    .expect(400)

  const { response } = await getAllContentFromNotes()

  expect(response.body).toHaveLength(initialNotes.length)
})

test('a note that has a valid id but do not exist can not be deleted', async () => {
  const validObjectIdThatDoNotExist = '604ef8475c534f35ccf96b89'
  await api
    .delete(`/api/notes/${validObjectIdThatDoNotExist}`)
    .expect(404)

  const { response } = await getAllContentFromNotes()

  expect(response.body).toHaveLength(initialNotes.length)
})

afterAll(() => {
  moongose.connection.close()
  server.close()
})

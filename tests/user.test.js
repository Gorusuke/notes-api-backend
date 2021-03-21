const bcrypt = require('bcrypt')
const moongose = require('mongoose')
const User = require('../models/User')
const {api, getAllUsers} = require('./helper')
const {server} = require('../index')



describe('creating a new user', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('pswd', 10)
    const user = new User({
      username: 'Great',
      passwordHash
    })

    await user.save()
  })
  
  test('works as expected creating a fresh username', async () => {
    // const usersDB = await User.find({})
    const usersAtStart = await getAllUsers()

    const newUser = {
      username: 'Sophy',
      name: 'Sofia',
      password: 'Sofia1254'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-type', /application\/json/)

    // const usersDBAfter = await User.find({})
    const userAtEnd = await getAllUsers()

    expect(userAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = userAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  }) 
  
  test('creations fails with proper status code and message if username is already taken', async () => {
    const usersAtStart = await getAllUsers()

    const newUser = {
      username: 'Great',
      name: 'Alvaro',
      password: '1254784hsygd'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)

    expect(result.body.errors.username.message).toContain('`username` to be unique')
    
    const userAtEnd = await getAllUsers()
    expect(userAtEnd).toHaveLength(usersAtStart.length)
  }) 

  afterAll(() => {
    moongose.connection.close()
    server.close()
  })

})
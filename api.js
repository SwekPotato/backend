const express = require('express')
const user = require('./controllers/user')
const auth = require('./controllers/authentication')
const jwt = require('express-jwt')
const meeting = require('./controllers/meeting')
const availability = require('./controllers/availability')
const topic = require('./controllers/topic')
const { jwtSecret } = require('./config')
const api = express.Router()

api.get('/', (req, res) => res.send("Hello World"))

api.use(jwt({ secret: jwtSecret }).unless({ 
    path: [
        '/api/auth/login',
        '/api/auth/validate',
        { url: '/api/user', methods: ['POST'] },
    ],
}))

api.use('/auth', auth)
api.use('/user', user)
api.use('/meeting', meeting)
api.use('/availability', availability)
api.use('/topic', topic)

module.exports = api
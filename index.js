const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const api = require('./api')
require('./models')

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use('/api', api)

app.listen(3000, () => console.log('API listening on port 3000!'))  
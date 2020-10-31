const express = require('express')
const app = express()
const routes = require('./routes')
const session = require('express-session')
const knexSessionStore = require('connect-session-knex')(session)

const db = require('./config')

app.use(express.json())
app.use(
  session({
    resave: false,
    saveUninitialized: false, //GDPR LAWS REQUIRED
    secret: process.env.sec || 'brunopaualaSeCrEt',
    store: new knexSessionStore({
      knex: db,
      createtable: true,
    }),
  })
)

app.use('/api', routes)
app.listen('5000', () => console.log('servver running on port 5000'))

const express = require('express')
const router = express.Router()
const auth = require('./middleware/auth')
const users = require('./controllers/users')

router.route('/').get(auth.loginAuth, users.index)
router.route('/register').post(users.register)
router.route('/login').post(users.login)
router.route('/logout').get(users.logout)

module.exports = router

const bcrypt = require('bcryptjs')
const User = require('../models/User')

class Auth {
  loginAuth = async (req, res, next) => {
    try {
      if (!req.session || !req.session.user) {
        return res.status(401).json()
      }

      console.log('auth ok')

      next()
    } catch (error) {
      console.log(error)
      next()
    }
  }
}

module.exports = new Auth()

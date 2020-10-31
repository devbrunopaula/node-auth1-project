const User = require('../models/User')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')

class UserController {
  async index(req, res) {
    try {
      const user = await User.all()
      res.status(200).json(user)
    } catch (error) {
      console.log(error)
    }
  }

  async register(req, res) {
    try {
      const loginUser = await User.save({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 14),
      })
      res.status(201).json(loginUser)
    } catch (error) {
      console.log(error)
    }
  }

  async login(req, res, next) {
    try {
      const {username, password} = req.body
      const [user] = await User.findBy(username)
      if (!user) {
        res.status(404).json({msg: 'User Not Found'})
      }
      const validPassword = await bcrypt.compare(password, user.password)

      if (!validPassword) {
        res.status(401).json({msg: 'Invalid Credentials'})
      }
      req.session.user = user

      console.log('controller ok')
      res.status(200).json({
        id: user.id,
        msg: `Welcome ${user.username}`,
        user: user.username,
      })
    } catch (error) {
      console.log(error)
      next()
    }
  }

  async logout(req, res, next) {
    try {
      req.session.destroy((err) => {
        if (err) {
          next(err)
        } else {
          res.status(200).send('You are logged out..')
        }
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new UserController()

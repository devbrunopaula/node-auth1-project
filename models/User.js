const db = require('../config')

class User {
  async all() {
    return await db('users')
  }
  async save(payload) {
    return await db('users').insert(payload).returning('id')
  }

  async findBy(username) {
    return await db('users').where('username', username)
  }
}

module.exports = new User()

const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    password: 'yashita056',
    database: 'todo_database',
    host: 'localhost',
    port: 5432
})

// module.exports = pool;
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createUser = (request, response) => {
    const { name, email, doc} = request.body
  
    pool.query('INSERT INTO users (name, email, doc, info) VALUES ($1, $2, $3, $4)', [name, email, doc, info], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  }
  
  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email, doc, info } = request.body
    pool.query(
      'UPDATE users SET name = $1, email = $2, doc = $3, info = $4 WHERE id = $5',
      [name, email, doc, info, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${name}`)
      }
    )
  }
  
  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }
  
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }
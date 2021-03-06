const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db/db')

// Middleware (cors)
app.use(cors())
app.use(express.json())

// Routes
// Create a Todo ROUTE
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body

    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      [description]
    )

    res.json(newTodo.rows[0])
  } catch (err) {
    console.log(err)
  }
})

// Get All Todo ROUTE
app.get('/todos', async (req, res) => {
  try {
    const items = await pool.query('SELECT * FROM todo')

    res.json({ success: true, item: items.rows })
  } catch (err) {
    console.log(err)
  }
})

// Get A Todo ROUTE
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params

    const item = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id])

    res.json({ success: true, item: item.rows })
  } catch (err) {
    console.log(err)
  }
})

// Update a Todo ROUTE
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { description } = req.body

    const updateTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2',
      [description, id]
    )

    res.json({ success: true, message: 'Todo successfully updated.' })
  } catch (err) {
    console.log(err)
  }
})

// Delete a Todo ROUTE
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [
      id,
    ])

    res.json({ success: true, message: 'Todo successfully deleted.' })
  } catch (err) {
    console.log(err)
  }
})

app.listen('5000', () => {
  console.log('server has started on 5000 port')
})

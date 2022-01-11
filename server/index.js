const express = require('express')
const app = express()
const cors = require('cors')

// Middleware (cors)
app.use(cors())
app.use(express.json())

app.listen('5000', () => {
  console.log('server has started on 5000 port')
})

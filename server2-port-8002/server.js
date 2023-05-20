const express = require('express')

const app = express()
const PORT = 8002

app.get('/', (req, res) => {
  res.send(`Sending data from PORT:${PORT}`)
})

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`)
})

const express = require('express')
const { engine } = require('express-handlebars')

const app = express()
const PORT = 3000

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('signin')
})

app.listen(PORT, () => {
  console.log(`Express app is running on http://localhost:${PORT}`)
})

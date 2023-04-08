const express = require('express')
const { engine } = require('express-handlebars')

const { apis, pages } = require('./routes')
const handlebarsHelpers = require('./helpers/handlebars-helpers')

const app = express()
const PORT = 3000

app.engine('.hbs', engine({ extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/apis', apis)
app.use(pages)

app.listen(PORT, () => {
  console.log(`Express app is running on http://localhost:${PORT}`)
})

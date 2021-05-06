const express = require('express')
const path = require('path')
const exhbs = require('express-handlebars')

const membersRoute = require('./routes/routes')
const members = require('./model/Member')

// setup
const app = express()
app.engine('handlebars', exhbs())
app.set('view engine', 'handlebars')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Hola with HBS',
    members: members
  })
})

// route
app.use('/api/members', membersRoute)

// catch all middleware
app.use((req, res, next) => {
  res.render('404', {
    title: 'Page Not Found'
  })
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server started an port at ${PORT}`))
const express = require('express')
const exphbs = require('express-handlebars')



const session = require('express-session')

const userRoutes = require('./routes/usersRoutes')
const postsRoutes = require('./routes/postsRoutes')
const loginRoutes = require('./routes/loginRoutes')

const app = express()
const port = 3000

app.use(express.static('public'))

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())
// Configurando o uso de sessões
app.use(session({
    secret: 'F6F1F37584D8189C97F23F9DCD431B42', // Substitua pela sua chave secreta
    resave: false,
    saveUninitialized: true
  }));

app.use('/login', loginRoutes)
app.use('/users', userRoutes)
app.use('/posts', postsRoutes)


app.listen(port)
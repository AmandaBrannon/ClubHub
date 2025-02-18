const express = require('express')
const app = express()
const { PORT, CLIENT_URL } = require('./constants')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const cors = require('cors')

//import passport middleware
require('./middlewares/passport-middleware')

//initialize middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: CLIENT_URL, credentials: true }))
app.use(passport.initialize())

//import routes
const authRoutes = require('./routes/auth')
const eventsRoutes = require("./routes/events");


const clubsRoutes = require("./routes/clubs");

app.use('/api', authRoutes)
app.use("/api", clubsRoutes);


app.use('/api', eventsRoutes);

//initialize routes

//app start
const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`The app is running at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

appStart()
// all requires
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// initialize express
const app = express()
app.use(cors())
app.use(express.json())
const userRoutes = require('./routes/user')
const partyRoutes = require('./routes/party')

// connect to mongo
mongoose.connect(
	'mongodb+srv://connerpmcguire:nx5a%40ab%26Jdsi1JkYcc@dnd-cluster.ocozplc.mongodb.net/dnd-database?retryWrites=true&w=majority'
)

// middleware
app.use(express.json()) // allows the use of req.body inside routes to POST or PATCH

app.use((req, res, next) => {
	console.log(req.path, req.method)
	next()
})

// api routes
app.use('/api/user', userRoutes)
app.use('/api/party/', partyRoutes)

// listen to port
app.listen(3000, () => {
	console.log('app listening on port ', 3000)
})

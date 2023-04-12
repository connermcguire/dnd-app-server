// all requires
require('dotenv').config()

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
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		// listen to port
		app.listen(process.env.PORT, () => {
			console.log('app listening on port ', process.env.PORT)
		})
	})
	.catch((error) => {
		console.log(error)
	})

// middleware
app.use(express.json()) // allows the use of req.body inside routes to POST or PATCH

app.use((req, res, next) => {
	console.log(req.path, req.method)
	next()
})

// api routes
app.use('/api/user', userRoutes)
app.use('/api/party/', partyRoutes)

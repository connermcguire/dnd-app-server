const express = require('express')
const {
	handleGetAllUsers,
	handleGetUser,
	signUpUser,
	logInUser,
	handleDeleteUser,
	handleUpdateUser,
} = require('../../controllers/userController')

const router = express.Router()

// GET all users
router.get('/', handleGetAllUsers)

// GET one user
router.get('/:id', handleGetUser)

// POST a new user || Sign Up
router.post('/signup', signUpUser)

// POST a user || Log In
router.post('/login', logInUser)

// DELETE a user
router.delete('/:id', handleDeleteUser)

// UPDATE a user
router.patch('/:id', handleUpdateUser)

module.exports = router

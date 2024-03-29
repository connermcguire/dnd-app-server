const UserSchema = require('../models/UserModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (_id, email, cards) => {
	return jwt.sign({ _id, email, cards }, process.env.SECRET, {
		expiresIn: '3d',
	})
}

// get all users
const handleGetAllUsers = async (req, res) => {
	const users = await UserSchema.find({}).sort({ createdAt: -1 })

	if (!users) {
		return res.status(404).json({ error: 'Server error' })
	}
	res.status(200).json(users)
}

// get one user
const handleGetUser = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid User ID' })
	}

	const user = await UserSchema.findById(id)

	if (!user) {
		return res.status(404).json({ error: 'User not found' })
	}

	res.status(200).json(user)
}

// create new user
const signUpUser = async (req, res) => {
	const { username, password, email, bio, characterName, cards, parties } =
		req.body

	// add doc to db
	try {
		const user = await UserSchema.signUp(
			username,
			password,
			email,
			bio,
			characterName,
			cards,
			parties
		)

		// create token
		const token = createToken()

		res.status(200).json({ email, _id, cards, token })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

// login user
const logInUser = async (req, res) => {
	const { email, password } = req.body
	try {
		const user = await UserSchema.logIn(email, password)
		const _id = user.id
		const cards = user.cards

		// create a token
		const token = createToken(user.id, user.cards)

		res.status(200).json({ _id, cards, email, token })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

// delete a user
const handleDeleteUser = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid User ID' })
	}

	const user = await UserSchema.findOneAndDelete({ _id: id })

	if (!user) {
		return res.status(400).json({ error: 'User not found' })
	}

	res.status(200).json(user)
}

// update a user
const handleUpdateUser = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid User ID' })
	}

	const user = await UserSchema.findOneAndUpdate({ _id: id }, { ...req.body })

	if (!user) {
		return res.status(400).json({ error: 'User not found' })
	}

	res.status(200).json(user)
}
module.exports = {
	handleGetAllUsers,
	handleGetUser,
	signUpUser,
	logInUser,
	handleDeleteUser,
	handleUpdateUser,
}

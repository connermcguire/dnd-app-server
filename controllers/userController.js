const UserSchema = require('../models/userModel')
const mongoose = require('mongoose')

// get all users
const handleGetAllUsers = async (req, res) => {
	const users = await UserSchema.find({}).sort({ createdAt: -1 })

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
const handleCreateUser = async (req, res) => {
	const { username, password, bio, characterName, parties } = req.body

	// add doc to db. What does doc mean, document?
	try {
		const user = await UserSchema.create({
			username,
			password,
			bio,
			characterName,
			parties,
		})
		res.status(200).json(user)
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

	const user = await UserModel.findOneAndUpdate({ _id: id }, { ...req.body })

	if (!user) {
		return res.status(400).json({ error: 'User not found' })
	}

	res.status(200).json(user)
}
module.exports = {
	handleGetAllUsers,
	handleGetUser,
	handleCreateUser,
	handleDeleteUser,
	handleUpdateUser,
}

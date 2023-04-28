const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		bio: String,
		characterName: String,
		parties: Array,
	},
	{ timestamps: true }
)

// Static signup method
UserSchema.statics.signUp = async function (
	username,
	password,
	email,
	bio,
	characterName,
	parties
) {
	// Validation
	if (!username || !password || !email) {
		throw Error('Username, email, and password fields are required.')
	}

	if (!validator.isEmail(email)) {
		throw Error('Invalid email')
	}

	if (!validator.isStrongPassword(password)) {
		throw Error('Password does not meet criteria')
	}

	// Check for duplicate email
	const duplicateEmail = await this.findOne({ email })
	if (duplicateEmail) {
		throw Error('A User with this email already exists')
	}

	// Hash password
	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(password, salt)

	// create user
	const user = await this.create({
		username,
		password: hash,
		email,
		bio,
		characterName,
		parties,
	})

	return user
}

// static login method || what does static mean here?
UserSchema.statics.logIn = async function (email, password) {
	console.log('model', email, password)
	// auth
	if (!email || !password) {
		throw Error('All fields required')
	}

	const user = await this.findOne({ email })
	if (!user) {
		throw Error('Incorrect email')
	}

	const match = await bcrypt.compare(password, user.password)
	console.log(match, 'match')
	if (!match) {
		console.log(password, user.password)
		throw Error('Incorrect password')
	}

	return user
}

module.exports = mongoose.model('User', UserSchema)

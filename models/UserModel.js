const mongoose = require('mongoose')

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
		bio: String,
		characterName: String,
		parties: [Schema.ObjectId],
	},
	{ timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)

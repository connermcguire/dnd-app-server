const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PartySchema = new Schema(
	{
		partyName: String,
		password: {
			type: String,
			required: true,
		},
		bio: String,
		members: Array,
	},
	{ timestamps: true }
)
module.exports = mongoose.model('Party', PartySchema)

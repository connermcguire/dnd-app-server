const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CreatureSchema = new Schema(
	{
		name: String,
		HP: Number,
		AC: Number,
		environment: String,
		habits: String,
	},
	{ timeseries: true }
)
module.exports = mongoose.model('Creature', CreatureSchema)

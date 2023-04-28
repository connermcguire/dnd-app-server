const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CardSchema = new Schema(
	{
		cardName: String,
		cardText: String,
	},
	{ timestamps: true }
)
module.exports = mongoose.model('Card', CardSchema)

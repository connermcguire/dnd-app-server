const CardSchema = require('../models/CardModel')
const mongoose = require('mongoose')

// GET all cards
const handleGetAllCards = async (req, res) => {
	const cards = await CardSchema.find({}).sort({ createdAt: -1 })

	if (!cards) {
		return res.status(404).json({ error: 'Server error' })
	}
	res.status(200).json(cards)
}

// GET one card
const handleGetCard = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Card ID' })
	}

	const card = await CardSchema.findById(id)

	if (!card) {
		return res.status(404).json({ error: 'Card not found' })
	}

	res.status(200).json(card)
}

// create new card
const handleCreateCard = async (req, res) => {
	const { cardName, cardText, parentId } = req.body

	// add doc to db
	try {
		const card = await CardSchema.create({
			cardName,
			cardText,
			parentId,
		})
		res.status(200).json(card)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

// delete a card
const handleDeleteCard = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Card ID' })
	}

	const card = await CardSchema.findOneAndDelete({ _id: id })

	if (!card) {
		return res.status(400).json({ error: 'Card not found' })
	}

	res.status(200).json(card)
}

// update a card
const handleUpdateCard = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Card ID' })
	}

	const card = await CardSchema.findOneAndUpdate({ _id: id }, { ...req.body })

	if (!card) {
		return res.status(400).json({ error: 'Card not found' })
	}

	res.status(200).json(card)
}
module.exports = {
	handleGetAllCards,
	handleGetCard,
	handleCreateCard,
	handleDeleteCard,
	handleUpdateCard,
}

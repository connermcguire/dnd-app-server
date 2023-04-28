const CreatureSchema = require('../models/CreatureModel')
const mongoose = require('mongoose')

// GET all creatures
const handleGetAllCreatures = async (req, res) => {
	const creatures = await CreatureSchema.find({}).sort({ createdAt: -1 })

	if (!creatures) {
		return res.status(404).json({ error: 'Server error' })
	}
	res.status(200).json(creatures)
}

// GET one creature
const handleGetCreature = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Creature ID' })
	}

	const creature = await CreatureSchema.findById(id)

	if (!creature) {
		return res.status(400).json({ error: 'Creature not found' })
	}

	res.status(200).json(creature)
}

// create new creature
const handleCreateCreature = async (req, res) => {
	const { name, HP, AC, environment, habits } = req.body

	// add doc to db
	try {
		const creature = await CreatureSchema.create({
			name,
			HP,
			AC,
			environment,
			habits,
		})
		res.status(200).json(creature)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

// delete a creature
const handleDeleteCreature = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Creature ID' })
	}

	const creature = await CreatureSchema.findOneAndDelete({ _id: id })

	if (!creature) {
		return res.status(400).json({ error: 'Creature not found' })
	}

	res.status(200).json(creature)
}

// update a creature
const handleUpdateCreature = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Creature ID' })
	}

	const creature = await CreatureSchema.findOneAndUpdate(
		{ _id: id },
		{ ...req.body }
	)

	if (!creature) {
		return res.status(400).json({ error: 'Creature not found' })
	}

	res.status(200).json(creature)
}
module.exports = {
	handleGetAllCreatures,
	handleGetCreature,
	handleCreateCreature,
	handleDeleteCreature,
	handleUpdateCreature,
}

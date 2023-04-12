const PartySchema = require('../models/partyModel')
const mongoose = require('mongoose')

// get all parties
const handleGetAllParties = async (req, res) => {
	const parties = await PartySchema.find({}).sort({ createdAt: -1 })

	res.status(200).json(parties)
}

// get one party
const handleGetParty = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Party ID' })
	}

	const party = await PartySchema.findById(id)

	if (!party) {
		return res.status(404).json({ error: 'Party not found' })
	}

	res.status(200).json(party)
}

// create new party
const handleCreateParty = async (req, res) => {
	const { partyName, password, bio, members } = req.body

	// add doc to db. What does doc mean, document?
	try {
		const party = await PartySchema.create({
			partyName,
			password,
			bio,
			members,
		})
		res.status(200).json(party)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

// delete a party
const handleDeleteParty = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Party ID' })
	}

	const party = await PartySchema.findOneAndDelete({ _id: id })

	if (!party) {
		return res.status(400).json({ error: 'Party not found' })
	}

	res.status(200).json(party)
}

// update a party
const handleUpdateParty = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Invalid Party ID' })
	}

	const party = await PartySchema.findOneAndUpdate(
		{ _id: id },
		{ ...req.body }
	)

	if (!party) {
		return res.status(400).json({ error: 'Party not found' })
	}

	res.status(200).json(party)
}
module.exports = {
	handleGetAllParties,
	handleGetParty,
	handleCreateParty,
	handleDeleteParty,
	handleUpdateParty,
}

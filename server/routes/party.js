const express = require('express')
const {
	handleGetAllParties,
	handleGetParty,
	handleCreateParty,
	handleDeleteParty,
	handleUpdateParty,
} = require('../../controllers/partyController')

const router = express.Router()

// GET all parties
router.get('/', handleGetAllParties)

// GET one party
router.get('/:id', handleGetParty)

// POST a new party
router.post('/', handleCreateParty)

// DELETE a party
router.delete('/:id', handleDeleteParty)

// UPDATE a party
router.patch('/:id', handleUpdateParty)

// Join a party
// router.patch('/:uid/:pid', handleJoinParty)

module.exports = router

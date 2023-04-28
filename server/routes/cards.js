const express = require('express')
const {
	handleGetAllCards,
	handleGetCard,
	handleCreateCard,
	handleDeleteCard,
	handleUpdateCard,
} = require('../../controllers/cardController')

const router = express.Router()

// Get all cards
router.get('/', handleGetAllCards)

// Get one card
router.get('/:id', handleGetCard)

// POST a new card
router.post('/', handleCreateCard)

// DELETE a card
router.delete('/:id', handleDeleteCard)

// UPDATE a card
router.patch('/:id', handleUpdateCard)

module.exports = router

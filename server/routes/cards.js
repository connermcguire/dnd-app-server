const express = require('express')
const {
	handleGetAllCards,
	handleGetCard,
	handleCreateCard,
	handleDeleteCard,
	handleUpdateCard,
} = require('../../controllers/cardController')
const requireAuth = require('../../middleware/requireAuth')

const router = express.Router()

// require auth for all routes
router.use(requireAuth)

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

const express = require('express')
const {
	handleGetAllCreatures,
	handleGetCreature,
	handleCreateCreature,
	handleDeleteCreature,
	handleUpdateCreature,
} = require('../../controllers/creatureController')

const router = express.Router()

// GET all creatures
router.get('/', handleGetAllCreatures)

// GET one creature
router.get('/:id', handleGetCreature)

// POST a new creture
router.post('/', handleCreateCreature)

// DELETE a creature
router.delete('/:', handleDeleteCreature)

// UPDATE a creature
router.patch('/:id', handleUpdateCreature)

module.exports = router

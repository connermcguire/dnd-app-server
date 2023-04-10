const express = require('express')

const router = express.Router()

// GET all parties
router.get('/', (req, res) => {
	res.json({ msg: 'GET all parties' })
})

// GET one party
router.get('/:id', (req, res) => {
	res.json({ msg: 'GET one party' })
})

// POST a new party
router.post('/', (req, res) => {
	res.json({ msg: 'POST a new party' })
})

// DELETE a user
router.delete('/:id', (req, res) => {
	res.json({ msg: 'DELETE a party' })
})

// UPDATE a user
router.patch('/id:', (req, res) => {
	res.json({ msg: 'UPDATE a party' })
})

module.exports = router

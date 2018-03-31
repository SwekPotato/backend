const express = require('express')
const { Buddy } = require('../models')

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const buddy = await Buddy.create(req.body)
        res.send(buddy)
    } catch (err) {
        res.sendStatus(400)
    }
})

router.post('/', async(req, res => {
    
}))

router.get('/', async (req, res) => {
    const buddy = await Buddy.findAll()
    if (buddy.length !== 0) {
        res.send(buddy)
    } else {
        res.sendStatus(204)
    }
})

router.get('/:buddyId', async (req, res) => {
    const buddy = await Buddy.findById(req.params.buddyId)
    if (buddy) {
        res.send(buddy)
    } else {
        res.sendStatus(404)
    }
})

router.patch('/:buddyId', async (req, res) => {
    const buddy = await Buddy.findById(req.params.buddyId)
    if (buddy) {
        const newBuddy = await buddy.update(req.body)
        res.send(newBuddy)
    } else {
        res.sendStatus(404)
    }
})

router.delete('/:buddyId', async (req, res) => {
    const buddy = await Buddy.findById(req.params.buddyId)
    if (buddy) {
        await buddy.destroy()
        res.send(buddy)
    } else {
        res.sendStatus(404)
    }
})

module.exports = router
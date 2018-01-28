const express = require('express')
const { Availability } = require('../models')

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const availability = await Availability.create(req.body)
        res.send(availability)
    } catch (err) {
        res.sendStatus(400)
    }
})

router.get('/', async (req, res) => {
    const availabilitys = await Availability.findAll()
    if (availabilitys.length !== 0) {
        res.send(availabilitys)
    } else {
        res.sendStatus(204)
    }
})

router.get('/:availabilityId', async (req, res) => {
    const availability = await Availability.findById(req.params.availabilityId)
    if (availability) {
        res.send(availability)
    } else {
        res.sendStatus(404)
    }
})

router.patch('/:availabilityId', async (req, res) => {
    const availability = await Availability.findById(req.params.availabilityId)
    if (availability) {
        const newAvailability = await availability.update(req.body)
        res.send(newAvailability)
    } else {
        res.sendStatus(404)
    }
})

router.delete('/:availabilityId', async (req, res) => {
    const availability = await Availability.findById(req.params.availabilityId)
    if (availability) {
        await availability.destroy()
        res.send(availability)
    } else {
        res.sendStatus(404)
    }
})

module.exports = router
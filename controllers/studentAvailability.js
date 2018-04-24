const express = require('express')
const { StudentAvailability } = require('../models')

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const availability = await StudentAvailability.create(req.body)
        res.send(availability)
    } catch (err) {
        console.log("Error: ", err)
        res.sendStatus(400)
    }
})

router.get('/', async (req, res) => {
    const availability = await StudentAvailability.findAll({
        where: {
            ['active']: true,
        }
    })
    if (availability.length !== 0) {
        res.send(availability)
    } else {
        res.sendStatus(204)
    }
})

router.get('/mine', async (req, res) => {
    const availability = await StudentAvailability.findAll({
        where: {
            ['studentId']: req.user.email,
        }
    })
    if (availability.length !== 0) {
        res.send(availability)
    } else {
        res.sendStatus(204)
    }
})

router.get('/:availabilityId', async (req, res) => {
    const availability = await StudentAvailability.findById(req.params.availabilityId)
    if (availability) {
        res.send(availability)
    } else {
        res.sendStatus(404)
    }
})

router.patch('/:availabilityId', async (req, res) => {
    const availability = await StudentAvailability.findById(req.params.availabilityId)
    if (availability) {
        const newAvailability = await availability.update(req.body)
        res.send(newAvailability)
    } else {
        res.sendStatus(404)
    }
})

router.delete('/:availabilityId', async (req, res) => {
    const availability = await StudentAvailability.findById(req.params.availabilityId)
    if (availability) {
        await availability.destroy()
        res.send(availability)
    } else {
        res.sendStatus(404)
    }
})

module.exports = router
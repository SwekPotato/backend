const express = require('express')
const { Meeting } = require('../models')

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const meeting = await Meeting.create(req.body)
        res.send(meeting)
    } catch (err) {
        res.sendStatus(400)
    }
})

router.get('/', async (req, res) => {
    const meetings = await Meeting.findAll()
    if (meetings.length !== 0) {
        res.send(meetings)
    } else {
        res.sendStatus(204)
    }
})

router.get('/:meetingId', async (req, res) => {
    const meeting = await Meeting.findById(req.params.meetingId)
    if (meeting) {
        res.send(meeting)
    } else {
        res.sendStatus(404)
    }
})

router.patch('/:meetingId', async (req, res) => {
    const meeting = await Meeting.findById(req.params.meetingId)
    if (meeting) {
        const newMeeting = await meeting.update(req.body)
        res.send(newMeeting)
    } else {
        res.sendStatus(404)
    }
})

router.delete('/:meetingId', async (req, res) => {
    const meeting = await Meeting.findById(req.params.meetingId)
    if (meeting) {
        await meeting.destroy()
        res.send(meeting)
    } else {
        res.sendStatus(404)
    }
})

module.exports = router
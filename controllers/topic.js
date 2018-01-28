const express = require('express')
const { Topic } = require('../models')

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const topic = await Topic.create(req.body)
        res.send(topic)
    } catch (err) {
        res.sendStatus(400)
    }
})

router.get('/', async (req, res) => {
    const topics = await Topic.findAll()
    if (topics.length !== 0) {
        res.send(topics)
    } else {
        res.sendStatus(204)
    }
})

router.get('/:topicId', async (req, res) => {
    const topic = await Topic.findById(req.params.topicId)
    if (topic) {
        res.send(topic)
    } else {
        res.sendStatus(404)
    }
})

router.patch('/:topicId', async (req, res) => {
    const topic = await Topic.findById(req.params.topicId)
    if (topic) {
        const newTopic = await topic.update(req.body)
        res.send(newTopic)
    } else {
        res.sendStatus(404)
    }
})

router.delete('/:topicId', async (req, res) => {
    const topic = await Topic.findById(req.params.topicId)
    if (topic) {
        await topic.destroy()
        res.send(topic)
    } else {
        res.sendStatus(404)
    }
})

module.exports = router
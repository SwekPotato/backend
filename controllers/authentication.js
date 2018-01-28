const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Sequelize = require('sequelize')
const { User } = require('../models')
const { jwtSecret } = require('../config')

const router = express.Router()

router.post('/login', async (req, res) => {
    const user = await User.findOne({
        where: {
            email: {
                [Sequelize.Op.iLike]: req.body.email
            }
        },
    })
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({
                userId: user.id,
            }, jwtSecret)
            const info = {token: token, type: user.type}
            res.send(info)
        } else {
            res.sendStatus(403)
        }
    } else {
        res.sendStatus(404)
    }
})

router.get('/validate', async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.query.username,
        },
    })

    if (user) {
        res.sendStatus(412)
    } else {
        res.sendStatus(200)
    }
})

router.get('/verify', (req, res) => {
    const header = req.get('authorization')
    const token = header.substring(7)
    try {
        const decoded = jwt.verify(token, jwtSecret)
        res.sendStatus(200)
    } catch(err) {
        res.sendStatus(403)
    }
})

module.exports = router
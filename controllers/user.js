const express = require('express')
const { User } = require('../models')
const bcrypt = require('bcryptjs')
const router = express.Router()
const Sequelize = require('sequelize')

function validEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = re.test(email.toLowerCase())
    return valid
}

router.post('/', async (req, res) => {  
    if(!validEmail(req.body.email)) {
        return res.sendStatus(400)
    }

    try {
        const user = await User.create({
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 8)
        })
        res.send(user)
    } catch (err) {
        console.error(err)
        res.sendStatus(400)
    }
})

router.get('/', async (req, res) => {
    const users = await User.findAll({
        attributes: { exclude: ['password'] }
    })
    if (users.length !== 0) {
        res.send(users)
    } else {
        res.sendStatus(204)
    }
})

router.get('/:email', async (req, res) => {
    const user = await User.findOne({
        where: {
            email: {
                [Sequelize.Op.iLike]: req.params.email
            },
        },
    })
    if (user) {
        res.send(user)
    } else {
        res.sendStatus(404)
    }
})

router.patch('/:userId', async (req, res) => {
    const user = await User.findById(req.params.userId)
    if (user) {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 8)
        }
        const newUser = await user.update(req.body)
        res.send(newUser)
    } else {
        res.sendStatus(404)
    }
})

router.delete('/:userId', async (req, res) => {
    const user = await User.findById(req.params.userId)
    if (user) {
        await user.destroy()
        res.send(user)
    } else {
        res.sendStatus(404)
    }
})

module.exports = router
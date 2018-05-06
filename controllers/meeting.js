const express = require('express')
const { Meeting } = require('../models')
const { StudentAvailability } = require('../models')
const { TeacherAvailability } = require('../models')

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const meeting = await Meeting.create(req.body)
        // Update the 'active' field of Availability
        if (meeting.teacherId) {
            //console.log("teacherId:", meeting.teacherId)
            await TeacherAvailability.update(
                {active: false},
                {where: {id: meeting.availabilityId}})
        } else if (meeting.studentId) {
            //console.log("studentId:", meeting.studentId)
            await StudentAvailability.update(
                {active: false},
                {where: {id: meeting.availabilityId}})
        } else {
            res.sendStatus(400)
        }
        
        res.send(meeting)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
})

router.get('/', async (req, res) => {
    let id;
    if(req.user.ageGroup == "less than 55") {
        id = "studentId";
    } else {
        id = "teacherId";
    }
    const meetings = await Meeting.findAll({
        where: {
            [id]: req.user.email,
        }
    })
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
         // Update the 'active' field of Availability
         if (meeting.teacherId) {
            //console.log("teacherId:", meeting.teacherId)
            await TeacherAvailability.update(
                {active: true},
                {where: {id: meeting.availabilityId}})
        } else if (meeting.studentId) {
            //console.log("studentId:", meeting.studentId)
            await StudentAvailability.update(
                {active: true},
                {where: {id: meeting.availabilityId}})
        } else {
            res.sendStatus(400)
        }       
        await meeting.destroy()
        res.send(meeting)
    } else {
        res.sendStatus(404)
    }
})

module.exports = router
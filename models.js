const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

const User = sequelize.define('user', {
    username: { type: Sequelize.STRING, unique: true, allowNull: false}, 
    email: { type: Sequelize.STRING, unique: true, allowNull: false},
    type: { type: Sequelize.ENUM('teacher', 'student'), allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false},
    timezone: { type: Sequelize.ENUM('GMT-8', 'GMT+9'), allowNull: false},
    picture: Sequelize.STRING,
    biography: Sequelize.TEXT,
})

const Meeting = sequelize.define('meeting', {
    topicId: { type: Sequelize.INTEGER, allowNull: false},
    teacherId: { type: Sequelize.INTEGER, allowNull: false},
    studentId: { type: Sequelize.INTEGER, allowNull: false},
    availabilityId: { type: Sequelize.INTEGER, allowNull: false},
    appointmentOn: { type: Sequelize.DATEONLY, allowNull: false},
    transcript: Sequelize.TEXT,
    startedOn: Sequelize.DATE,
    endedOn: Sequelize.DATE,
})

User.hasMany(Meeting, {foreignKey: 'teacherId', sourceKey: 'id'})
Meeting.belongsTo(User, {foreignKey: 'teacherId', targetKey: 'id'})

User.hasMany(Meeting, {foreignKey: 'studentId'})
Meeting.belongsTo(User, {foreignKey: 'studentId'})

const Availability = sequelize.define('availability', {
    teacherId: {type: Sequelize.INTEGER, allowNull: false},
    day: {type: Sequelize.ENUM(
        'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
    ), allowNull: false},
    startTime: {type: Sequelize.DATE, allowNull: false},
    endTime: { type: Sequelize.DATE, allowNull: false},
})

Availability.hasMany(Meeting, {foreignKey: 'availabilityId'})
Meeting.belongsTo(Availability, {foreignKey: 'availabilityId'})

User.hasMany(Availability, {foreignKey: 'teacherId'})
Availability.belongsTo(User, {foreignKey: 'teacherId'})

const Topic = sequelize.define('topic', {
    name: { type: Sequelize.STRING, allowNull: false, unique: true },
    picture: { type:Sequelize.STRING },
})

Topic.hasMany(Meeting, {foreignKey: 'topicId'})
Meeting.belongsTo(Topic, {foreignKey: 'topicId'})

sequelize.sync() 
module.exports = { 
    User,
    Meeting,
    Availability,
    Topic,
}
const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

const User = sequelize.define('user', {
    name: { type: Sequelize.STRING, allowNull: false},
    email: { type: Sequelize.STRING, unique: true, allowNull: false},
    ageGroup: { type: Sequelize.ENUM('13 - 17', '18 - 24', '25 - 44', '45 - 64'), allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false},
    timezone: { type: Sequelize.ENUM('Korea', 'U.S. (PST)'), allowNull: false},
    //securityQuestion: {type: Sequelize.ENUM('What is your best friend first name?', 'What is your favorite food?', 'What is your favorite movie?'), allowNull: false},
    //securityAnswer: {type: Sequelize.STRING, allowNull: false},
    skypeId: { type: Sequelize.STRING, allowNull: false},
})

const Meeting = sequelize.define('meeting', {
    topicId: { type: Sequelize.INTEGER},
    teacherId: { type: Sequelize.STRING, allowNull: false},
    studentId: { type: Sequelize.STRING, allowNull: false},
    availabilityId: { type: Sequelize.INTEGER},
    appointmentOn: { type: Sequelize.DATEONLY, allowNull: false},
    transcript: Sequelize.TEXT,
    startedOn: Sequelize.DATE,
    endedOn: Sequelize.DATE,
    startTime: {type: Sequelize.DATE, allowNull: false},
    endTime: { type: Sequelize.DATE, allowNull: false},
})

User.hasMany(Meeting, {foreignKey: 'teacherId', sourceKey: 'email'})
Meeting.belongsTo(User, {foreignKey: 'teacherId', targetKey: 'email'})

User.hasMany(Meeting, {foreignKey: 'studentId', sourceKey: 'email'})
Meeting.belongsTo(User, {foreignKey: 'studentId', targetKey: 'email'})

const Buddy = sequelize.define('buddy', {
    teacherId: { type: Sequelize.STRING, allowNull: false},
    studentId: { type: Sequelize.STRING, allowNull: false},
})

User.hasMany(Buddy, {foreignKey: 'teacherId', sourceKey: 'email'})
Buddy.belongsTo(User, {foreignKey: 'teacherId', targetKey: 'email'})

User.hasMany(Buddy, {foreignKey: 'studentId', sourceKey: 'email'})
Buddy.belongsTo(User, {foreignKey: 'studentId', targetKey: 'email'})


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

sequelize.sync() //do {force: true}
module.exports = { 
    User,
    Meeting,
    Availability,
    Buddy,
    Topic,
}
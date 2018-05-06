const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

const User = sequelize.define('user', {
    name: { type: Sequelize.STRING, allowNull: false},
    email: { type: Sequelize.STRING, unique: true, allowNull: false},
    ageGroup: { type: Sequelize.ENUM('less than 55', '55 or more'), allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false},
    timezone: { type: Sequelize.ENUM('Korea', 'U.S. (PST)'), allowNull: true},
    //securityQuestion: {type: Sequelize.ENUM('What is your best friend first name?', 'What is your favorite food?', 'What is your favorite movie?'), allowNull: false},
    //securityAnswer: {type: Sequelize.STRING, allowNull: false},
    skypeId: { type: Sequelize.STRING, allowNull: false},
})

const Meeting = sequelize.define('meeting', {
    topicId: { type: Sequelize.INTEGER},
    teacherId: { type: Sequelize.STRING, allowNull: false},
    studentId: { type: Sequelize.STRING, allowNull: false},
    availabilityId: { type: Sequelize.INTEGER},
    date: { type: Sequelize.DATEONLY, allowNull: false},
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

const TeacherAvailability = sequelize.define('teacherAvailability', {
    teacherId: {type: Sequelize.STRING, allowNull: false},
    day: {type: Sequelize.ENUM(
        'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
    ), allowNull: true},
    date: { type: Sequelize.DATEONLY, allowNull: false},
    startTime: {type: Sequelize.DATE, allowNull: false},
    endTime: { type: Sequelize.DATE, allowNull: false},
    active: { type: Sequelize.BOOLEAN, allowNull: false},
})

TeacherAvailability.hasMany(Meeting, {foreignKey: 'availabilityId'})
Meeting.belongsTo(TeacherAvailability, {foreignKey: 'availabilityId'})

User.hasMany(TeacherAvailability, {foreignKey: 'teacherId', sourceKey: 'email'})
TeacherAvailability.belongsTo(User, {foreignKey: 'teacherId', sourceKey: 'email'})

const StudentAvailability = sequelize.define('studentAvailability', {
    studentId: {type: Sequelize.STRING, allowNull: false},
    day: {type: Sequelize.ENUM(
        'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
    ), allowNull: true},
    date: { type: Sequelize.DATEONLY, allowNull: false},
    startTime: {type: Sequelize.DATE, allowNull: false},
    endTime: { type: Sequelize.DATE, allowNull: false},
    active: { type: Sequelize.BOOLEAN, allowNull: false},
})

StudentAvailability.hasMany(Meeting, {foreignKey: 'availabilityId'})
Meeting.belongsTo(StudentAvailability, {foreignKey: 'availabilityId'})

User.hasMany(StudentAvailability, {foreignKey: 'studentId', sourceKey: 'email'})
StudentAvailability.belongsTo(User, {foreignKey: 'studentId', sourceKey: 'email'})

const Topic = sequelize.define('topic', {
    name: { type: Sequelize.STRING, allowNull: false, unique: true },
    picture: { type:Sequelize.STRING },
})

Topic.hasMany(Meeting, {foreignKey: 'topicId'})
Meeting.belongsTo(Topic, {foreignKey: 'topicId'})

sequelize.sync({force: false})
module.exports = { 
    User,
    Meeting,
    StudentAvailability,
    TeacherAvailability,
    Buddy,
    Topic,
}
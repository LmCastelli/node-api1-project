// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')
// Imports above

const server = express()

server.use(express.json())

// Get all users

server.get('/api/users', (req,res) => {
    Users.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: 'unable to retrieve users',
                err: err.message
            })
        })
})

// Get user by Id

// Post new user

// Put (update) user by id

// Delete by id

module.exports = server; // EXPORT YOUR SERVER instead of {}

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
                message: "The users information could not be retrieved",
                err: err.message
            })
        })
})

// Get user by Id

server.get('/api/users/:id', async (req, res) => {
    try{
        const user = await Users.findById(req.params.id)
        if (!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
        })}
        else {
            res.json(user)
        }
    } catch (err) {
        res.status(500).json({
            message: "The user information could not be retrieved",
            error: err.message
        })
    }
})

// Post new user

server.post('/api/users', async (req, res) => {
    try {
        if (!req.body.name || !req.body.bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else {
            const newUser = await Users.insert(req.body)
            res.status(201).json(newUser)
        }
    } catch (err) {
        res.status(500).json({
            message: "There was an error while saving the user to the database",
            error: err.message
        })
    }
})

// Put (update) user by id

server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req 
    try {
        
        if (!req.body.name || !req.body.bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else {
            const updated = await Users.update(id, body)
            if (!updated) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            } else {
                res.status(200).json
                res.json(updated)
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "The user information could not be modified",
            error: err.message
         })
    } 
})

// Delete by id

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params
    Users.remove(id)
        .then(deletedUser => {
            if (!deletedUser) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            } else {
                res.json(deletedUser)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The user could not be removed",
                error: err.message
            })
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}

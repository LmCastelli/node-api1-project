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

server.get('/api/users/:id', async (req, res) => {
    try{
        const user = await Users.findById(req.params.id)
        if (!user) {
            res.status(404).json({
                message: `user by id ${req.params.id} does not exist`
        })}
        else {
            res.json(user)
        }
    } catch (err) {
        res.status(500).json({
            message: 'error getting by id',
            error: err.message
        })
    }
})

// Post new user

server.post('/api/users', async (req, res) => {
    try {
        if (!req.body.name || !req.body.bio) {
            res.status(400).json({
                message: 'name and bio required'
            })
        } else {
            const newUser = await Users.insert(req.body)
            res.status(201).json(newUser)
        }
    } catch (err) {
        res.status(500).json({
            message: 'error posting new user',
            error: err.message
        })
    }
})

// Put (update) user by id

server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req 
    try {
        const updated = await Users.update(id, body)
        if (!updated) {
            res.status(404).json({
                message: `user by id ${id} does not exist`
            })
        } else {
            res.json(updated)
        }
    } catch (err) {
        res.status(500).json({
            message: 'error editing user',
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
                    message: `user by id ${id} does not exist`
                })
            } else {
                res.json(deletedUser)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'error deleting user',
                error: err.message
            })
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}

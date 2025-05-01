
const model = require('../models/users')
const express = require('express')
const router = express.Router()
const { CustomError, statusCodes } = require('../models/errors')

// Middleware to extract user ID from JWT token or session
const authenticateUser = (req, res, next) => {
    // In a real app, this would validate JWT token
    // For now, we'll use a userId from query or body for testing
    const userId = req.query.userId || req.body.userId || null
    
    // Store user ID in request object
    req.userId = userId ? parseInt(userId) : null
    next()
}

router 
    // Get all users with pagination
    .get('/', authenticateUser, async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 10
            
            // Check if user is admin for accessing all users
            if (req.userId) {
                const isAdmin = await model.isUserAdmin(req.userId)
                if (!isAdmin) {
                    // Non-admins can still see a limited user list
                    const data = await model.getAll(page, 5)
                    return res.json(data)
                }
            }
            
            const data = await model.getAll(page, limit)
            res.json(data)
        } catch (error) {
            next(error)
        }
    })

    // Create a new user
    .post('/', async (req, res, next) => {
        try {
            const user = req.body
            
            if (!user.name || !user.email) {
                return res.status(400).json({
                    error: 'Name and email are required'
                })
            }
            
            const newUser = await model.create(user)
            res.status(201).json(newUser)
        } catch (error) {
            if (error instanceof CustomError) {
                return res.status(error.status).json({ error: error.message })
            }
            next(error)
        }
    })

    // Get a specific user
    .get('/:id', authenticateUser, async (req, res, next) => {
        try {
            const id = parseInt(req.params.id)
            
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid user ID' })
            }
            
            // Check if user is trying to access another user's info
            if (id !== req.userId) {
                const isAdmin = await model.isUserAdmin(req.userId)
                if (!isAdmin) {
                    // For privacy, return limited info for other users
                    const data = await model.get(id)
                    return res.json({
                        id: data.id,
                        name: data.name,
                        created_at: data.created_at
                    })
                }
            }
            
            const data = await model.get(id)
            res.json(data)
        } catch (error) {
            if (error instanceof CustomError) {
                return res.status(error.status).json({ error: error.message })
            }
            next(error)
        }
    })
    
    // Search for users by name
    .get('/search/:query', authenticateUser, async (req, res, next) => {
        try {
            const { query } = req.params
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 10
            
            if (!query || query.length < 2) {
                return res.status(400).json({
                    error: 'Search query must be at least 2 characters'
                })
            }
            
            const users = await model.search(query, page, limit)
            res.json(users)
        } catch (error) {
            next(error)
        }
    })
    //  .post('/seed', (req,res,next) => {
    //         const {data} = req.body
    
    //         model
    //         .seed(data)
    //         .then((data) => {
    //             res.status(201).send(data);
    //         })
    //         .catch(next);
    //     })

    .delete('/:id', (req, res, next) => {
        const id = parseInt(req.params.id)
        model.remove(id).then((deletedUser) => {
            res.send(deletedUser)
        }).catch(next)
    })
    
module.exports = router



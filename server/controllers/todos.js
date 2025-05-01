const model = require('../models/todos')
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
    // Get all todos with optional pagination and filtering
    .get('/', authenticateUser, async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 10
            const userId = req.query.userId ? parseInt(req.query.userId) : null
            
            // Check if the request is filtered by user and if user has permission
            if (userId && userId !== req.userId) {
                const isAdmin = await model.isUserAdmin(req.userId)
                if (!isAdmin) {
                    return res.status(403).json({
                        error: 'You can only view your own todos'
                    })
                }
            }
            
            const data = await model.getAll(page, limit, userId || req.userId)
            res.json(data)
        } catch (error) {
            next(error)
        }
    })

    // Get a specific todo by ID
    .get('/:id', authenticateUser, async (req, res, next) => {
        try {
            const id = parseInt(req.params.id)
            
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid todo ID' })
            }
            
            const todo = await model.get(id)
            
            // Check if the user has permission to see this todo
            if (todo.userId !== req.userId) {
                const isAdmin = await model.isUserAdmin(req.userId)
                if (!isAdmin) {
                    return res.status(403).json({ 
                        error: 'You can only view your own todos'
                    })
                }
            }
            
            res.json(todo)
        } catch (error) {
            if (error instanceof CustomError) {
                return res.status(error.status).json({ error: error.message })
            }
            next(error)
        }
    })

    // Search todos by query text
    .get('/search/:query', authenticateUser, async (req, res, next) => {
        try {
            const { query } = req.params
            
            if (!query || query.length < 2) {
                return res.status(400).json({
                    error: 'Search query must be at least 2 characters'
                })
            }
            
            const todos = await model.search(query)
            
            // Filter to only show user's todos if not admin
            const isAdmin = await model.isUserAdmin(req.userId)
            
            if (!isAdmin && todos.items) {
                todos.items = todos.items.filter(todo => todo.userId === req.userId)
                todos.total = todos.items.length
            }
            
            res.json(todos)
        } catch (error) {
            next(error)
        }
    })

    // Create a new todo
    .post('/', authenticateUser, async (req, res, next) => {
        try {
            if (!req.userId) {
                return res.status(401).json({
                    error: 'You must be logged in to create todos'
                })
            }
            
            // Set the userId from the authenticated user
            const todo = {
                ...req.body,
                userId: req.userId
            }
            
            const newTodo = await model.create(todo)
            res.status(201).json(newTodo)
        } catch (error) {
            if (error instanceof CustomError) {
                return res.status(error.status).json({ error: error.message })
            }
            next(error)
        }
    })


    .patch('/:id', (req, res, next) => {
        const id = parseInt(req.params.id)
        const todo = req.body
        model.update(id, todo).then((updatedTodo) => {
            res.send(updatedTodo)
        }).catch(next)
    })
    .delete('/:id', (req, res, next) => {
        const id = parseInt(req.params.id)
        model.remove(id).then((deletedTodo) => {
            res.send(deletedTodo)
        }).catch(next)
    })
    
module.exports = router



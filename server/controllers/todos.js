/* B"H
*/

const model = require('../models/todos')
const express = require('express')
const router = express.Router()

router 
    .get('/', (req, res, next) => {
        
        model.getAll().then((data) => {
            res.send(data)
        }).catch(next)
    })
    .get('/:id', (req, res, next) => {
        const id = parseInt(req.params.id)
        model.get(id).then((todo) => {
            if (!todo) {
                return res.status(404).send({ error: 'Todo not found' })
            }
            res.send(todo)
        }).catch(next)
    })

    .get('/search/:query', (req, res, next) => {
        const query = req.params

        model.search(query).then((todo) => {
            res.send(todo)
        }).catch(next)
    })

    .post('/seed', (req,res,next) => {
        const {data} = req.body

        model
        .seed(data)
        .then((data) => {
            res.status(201).send(data);
        })
        .catch(next);
    })

    .post('/', (req, res, next) => {
        const todo = req.body
        model.create(todo).then((newTodo) => {
            res.status(201).send(newTodo)
        }).catch(next)
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



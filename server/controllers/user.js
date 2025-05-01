
const model = require('../models/users')
const express = require('express')
const router = express.Router()

router 
    .get('/', (req, res, next) => {
        
        model.getAll().then((data) => {
            res.send(data)
        }).catch(next)
    })

    .post('/', (req, res, next) => {
        const data = req.body
        model.create(data).then((data) => {
            res.status(201).send(data)
        }).catch(next)
    })


    .get('/:id', (req, res, next) => {
        const { id } = req.params

        model.get(id).then((data) => {
            res.send(data)
        }).catch(next)

    })
    .get('/search/:query', (req, res, next) => {
            const query = req.params
    
            model.search(query).then((user) => {
                res.send(user)
            }).catch(next)
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



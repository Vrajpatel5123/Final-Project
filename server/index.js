const express = require('express');
const todolistController = require('./controllers/todos');
const userController = require('./controllers/user');
require('dotenv').config()

    const PORT = 8000;

    const app = express();

    app.use(express.json())

    app
        
        .use("/api/v1/todos", todolistController)
        .use("/api/v1/users", userController)
        .use('/', express.static('dist'))

        // Error handling middleware
        .use((err, req, res, next) => {
            console.error(err);
            res.status(500)
            .send(err.message || 'Internal Server Error');
        })
        

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/`)
    })
    // Above is 

    console.log('Hello World!');
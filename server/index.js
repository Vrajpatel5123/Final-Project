const express = require('express');
const todolistController = require('./controllers/todos');
const userController = require('./controllers/user');
require('dotenv').config()

    const PORT = 8000;

    const app = express();



    // CORS
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
     if (req.method === 'OPTIONS') {
          return res.sendStatus(200)
     }
     next()
    })

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
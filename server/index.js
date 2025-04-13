const express = require('express');
const todolistController = require('./controllers/todos');

    const PORT = 8000;

    const app = express();

    app
    
        .get('/', (req, res) => {
            res.send('Hello New Paltz, Ny!!!');
        })
        
        .use("/api/todos", todolistController)
        

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/`)
    })
    // Above is 

    console.log('Hello World!');
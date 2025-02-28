const express = require('express');
    const PORT = 8000;

    const app = express();

    app.get('/', (req, res) => {
        res.send('Hello New Paltz, Ny!!!');
    })

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/`)
    })
    // Above is 

    console.log('Hello World!');
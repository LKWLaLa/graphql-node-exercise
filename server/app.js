const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('now listening on port 3000');
});

app.get('/', (req, res) => res.send('Hello World!'))
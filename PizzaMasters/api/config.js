const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello world!');
})

app.listen(3000, () => {
    console.log("Server is listening on http://localhost:3000");
})
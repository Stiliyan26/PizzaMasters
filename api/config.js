const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const authController = require('./controllers/auth.js');
const pizzaController = require('./controllers/pizza.js');

const app = express();
const PORT = process.env.PORT || 3000;

const MONGO_URI = 'mongodb+srv://Stiliyan26:pizzaMasters26@pizzamasters.1uwpx7d.mongodb.net/PizzaMasters?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI || 'mongodb://localhost/pizzaMasters', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!');
})

app.use(express.static(__dirname + '/public'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/dist/pizza-masters/index.html'));
});

app.use(morgan('tiny'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', authController);
app.use('/pizza', pizzaController);

app.listen(PORT, () => {
    console.log('App is running on port http://localhost:3000');
})


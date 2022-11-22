const Pizza = require('../models/Pizza.js');

const createPizza = async (pizzaData) => {
    const newPizza = new Pizza(pizzaData);

    return await newPizza.save();
}

module.exports = {
    createPizza
}
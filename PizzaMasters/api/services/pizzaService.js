const Pizza = require('../models/Pizza.js');

const createPizza = async (pizzaData) => {
    const newPizza = new Pizza(pizzaData);

    return await newPizza.save();
}

const getAllPizzas = async () => {
    const allPizzas = Pizza.find({}).lean();

    return allPizzas;
}

module.exports = {
    createPizza,
    getAllPizzas
}
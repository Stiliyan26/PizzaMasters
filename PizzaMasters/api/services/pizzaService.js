const Pizza = require('../models/Pizza.js');

const createPizza = async (pizzaData) => {
    const newPizza = new Pizza(pizzaData);

    return await newPizza.save();
}

const getAllPizzas = async () => {
    const allPizzas = await Pizza.find({});
    
    return allPizzas;
}

const getPizzaById = async (pizzaId) => {
    const pizza = await Pizza.findById(pizzaId).lean();

    return  pizza;
}

module.exports = {
    createPizza,
    getAllPizzas,
    getPizzaById
}
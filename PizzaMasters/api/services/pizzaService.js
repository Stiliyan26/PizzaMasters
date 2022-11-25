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

    return pizza;
}

const order = async (currentPizza, userId) => {
    const existingPizza = await Pizza.findById(currentPizza._id);

    if (existingPizza.ordered.includes(userId)) {
        throw new Error('This user already ordered this pizza!');
    }

    existingPizza.ordered.push(userId);
    existingPizza.ownerId = currentPizza.ownerId;

    return await existingPizza.save();
}

const deletePizzaById = async (pizzaId) => {
    await Pizza.findByIdAndDelete(pizzaId);
}

const updatePizza = async (pizzaId, pizzaData) => {
    const existing = await Pizza.findById(pizzaId);

    existing.image = pizzaData.image;
    existing.name = pizzaData.name;
    existing.info = pizzaData.info;
    existing.size = pizzaData.size;
    existing.price = pizzaData.price;
    existing.ownerId = pizzaData.ownerId;

    return await existing.save();
}

module.exports = {
    createPizza,
    getAllPizzas,
    getPizzaById,
    order,
    deletePizzaById,
    updatePizza
}
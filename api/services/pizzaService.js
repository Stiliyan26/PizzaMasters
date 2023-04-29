const Pizza = require('../models/Pizza.js');
const User = require('../models/User.js');

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
    const currentUser = await User.findById(userId);

    if (existingPizza.ordered.includes(userId)) {
        throw new Error('This user already ordered this pizza!');
    }

    if (currentUser.orders.includes(existingPizza._id)) {
        throw new Error('This pizza is already ordered!')
    }

    currentUser.orders.push(existingPizza._id)
    existingPizza.ordered.push(userId);
    existingPizza.ownerId = currentPizza.ownerId;

    await currentUser.save();

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

const getPizzasByOwner = async (userId) => {
    const pizzas = await Pizza.find({ ownerId: userId });

    return pizzas;
}

const getAllOrderedPizzas = async (userId) => {
    const user = await User.findById(userId).populate('orders');
    const orderedPizzas = user.orders;

    return orderedPizzas;
}

const deleteOrder = async (pizzaData, userId) => {
    const pizzaId = pizzaData._id;

    const currentPizza = await Pizza.findById(pizzaId);
    const user = await User.findById(userId);
 
    if (!currentPizza.ordered.includes(userId) && !user.orders.includes(pizzaId)) {
        throw new Error("This pizza is not ordered!")
    }

    const indexOfUser = currentPizza.ordered.indexOf(userId)
    currentPizza.ordered.splice(indexOfUser, 1);

    const indexOfPizza = user.orders.indexOf(pizzaId);
    user.orders.splice(indexOfPizza, 1)

    currentPizza.ownerId = pizzaData.ownerId;
    
    await currentPizza.save()
    await user.save();

    return currentPizza;
}

module.exports = {
    createPizza,
    getAllPizzas,
    getPizzaById,
    order,
    deletePizzaById,
    updatePizza,
    getPizzasByOwner,
    getAllOrderedPizzas,
    deleteOrder
}
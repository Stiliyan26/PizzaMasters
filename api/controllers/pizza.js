const router = require('express').Router();

const { createPizza, getAllPizzas, getPizzaById, order, deletePizzaById,
    updatePizza, getPizzasByOwner, getAllOrderedPizzas, deleteOrder } = require('../services/pizzaService.js');
const mapErrors = require('../utils/mapErrors');

router.post('/create', async (req, res) => {
    try {
        const pizzaData = {
            image: req.body.pizzaData.image,
            name: req.body.pizzaData.name,
            info: req.body.pizzaData.info,
            size: req.body.pizzaData.size,
            price: req.body.pizzaData.price,
            ownerId: req.body.userId,
        }

        const pizza = await createPizza(pizzaData);

        res.json(pizza);
    } catch (err) {
        const errors = mapErrors(err);

        res.status(409)
            .send(errors);
    }
});

router.get('/menu', async (req, res) => {
    try {
        const allPizzas = await getAllPizzas();

        res.json(allPizzas);

    } catch (err) {
        const errors = mapErrors(err);

        res.status(409)
            .send(errors);
    }
});

router.get('/menu/:pizzaId', async (req, res) => {
    try {
        const pizzaId = req.params.pizzaId;
        const pizza = await getPizzaById(pizzaId);

        res.json(pizza);

    } catch (err) {
        const errors = mapErrors(err);

        res.status(409)
            .send(errors);
    }
})

router.put('/order/:pizzaId', async (req, res) => {
    try {
        const pizzaId = req.body.pizzaId;
        const userId = req.body.userId;

        const currentPizza = await getPizzaById(pizzaId);

        if (currentPizza.ownerId == userId) {
            throw new Error('This user is has no premision to order this pizza!');
        }

        const pizzaWithUpdatedOrders = await order(currentPizza, userId);

        res.json(pizzaWithUpdatedOrders);

    } catch (err) {
        const errors = mapErrors(err);
        console.log(err);

        res.status(409)
            .send(errors);
    }
});

router.delete('/delete/:pizzaId', async (req, res) => {
    try {
        const pizzaId = req.params.pizzaId;

        await deletePizzaById(pizzaId);
        res.json('Animal deleted!');

    } catch (err) {
        const errors = mapErrors(err);
        console.log(err);

        res.status(409)
            .send(errors);
    }
})

router.put('/edit/:pizzaId', async (req, res) => {
    try {
        const pizzaId = req.body.pizzaId;
        const userId = req.body.userId;
        const newFormPizzaData = req.body.pizzaData;

        const currentPizza = await getPizzaById(pizzaId);

        const pizzaData = {
            image: newFormPizzaData.image,
            info: newFormPizzaData.info,
            name: newFormPizzaData.name,
            size: newFormPizzaData.size,
            price: newFormPizzaData.price,
            ownerId: currentPizza.ownerId,
        }

        if (userId != currentPizza.ownerId) {
            throw new Error('This user has no premision to edit this post!');
        }

        const updatedPizza = await updatePizza(pizzaId, pizzaData);
        res.json(updatedPizza);

    } catch (err) {
        const errors = mapErrors(err);
        console.log(err);

        res.status(409)
            .send(errors);
    }
})

router.put('/profile', async (req, res) => {
    try {
        const userId = req.body.ownerId;

        const myPizzas = await getPizzasByOwner(userId);

        res.json(myPizzas);
    } catch (err) {
        const errors = mapErrors(err);
        console.log(err);

        res.status(409)
            .send(errors);
    }
})

router.put('/cart', async (req, res) => {
    try {
        const userId = req.body.user;

        const orderedPizzas = await getAllOrderedPizzas(userId);
        res.json(orderedPizzas)

    } catch (err) {
        const errors = mapErrors(err);
        console.log(err);

        res.status(409)
            .send(errors);
    }
})

router.put('/deleteOrder/:pizzaId', async (req, res) => {
    try {
        const { pizzaData, userId } = req.body;

        const pizza = await deleteOrder(pizzaData, userId);

        res.json(pizza);
    } catch (err) {
        const errors = mapErrors(err);
        console.log(err);

        res.status(409)
            .send(errors);
    }
})

module.exports = router;

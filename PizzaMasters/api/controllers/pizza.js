const router = require('express').Router();

const { createPizza, getAllPizzas, getPizzaById, order } = require('../services/pizzaService.js');
const { getProfileById } = require('../services/authService.js');
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

module.exports = router;

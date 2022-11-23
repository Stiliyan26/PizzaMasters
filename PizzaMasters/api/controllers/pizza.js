const router = require('express').Router();

const { createPizza, getAllPizzas, getPizzaById } = require('../services/pizzaService.js');
const mapErrors = require('../utils/mapErrors');

router.post('/create', async (req, res) => {
    try {
        const pizzaData = {
            image: req.body.pizzaData.image,
            name: req.body.pizzaData.name,
            ingredients: req.body.pizzaData.ingredients,
            size: req.body.pizzaData.size,
            price: req.body.pizzaData.price,
            ownerId: req.body.userId,
            ordered: []
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

module.exports = router;

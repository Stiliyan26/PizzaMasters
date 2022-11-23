const router = require('express').Router();

const { createPizza, getAllPizzas } = require('../services/pizzaService.js');
const mapErrors = require('../utils/mapErrors');

router.post('/create', async (req, res) => {
    try {
        const pizzaData = {
            image: req.body.pizzaData.image,
            name: req.body.pizzaData.name,
            ingredients: req.body.pizzaData.ingredients,
            size: req.body.pizzaData.size,
            price: req.body.pizzaData.price,
            ownerId: req.body.userId
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

module.exports = router;

// {
//    pizzaData: { image: '', name: '', ingredients: '', size: '', price: '' },
//    userId: '637ce48f18c1b4c245f69f0c'
//  }
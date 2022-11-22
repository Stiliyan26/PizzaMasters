const { Schema, model, Types: { ObjectId } } = require('mongoose');

const pizzaSchema = new Schema({
    image: { type: String, required: true },
    name: { type: String, required: true, minlength: [5, 'Name should be at least 5 characters!'] },
    ingredients: { type: String, required: true, minlength: [10, 'Ingredients should be at least 10 characters!']},
    size: { type: String, required: true },
    price: { type: Number, required: true, min: [1, 'Price must be positve number!'] },
    ownerId: { type: ObjectId, ref: 'User', default: [] }
});

const Pizza = model('Pizza', pizzaSchema);

module.exports = Pizza;
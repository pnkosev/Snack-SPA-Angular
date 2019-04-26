const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: { type: Schema.Types.String, required: true },
    ingredients: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: true },
    imageURL: { type: Schema.Types.String, required: true },
    price: { type: Schema.Types.Number, required: true },
});

const Product = model('Product', productSchema);

module.exports = Product;
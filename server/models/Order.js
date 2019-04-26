const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    createdOn: { type: Schema.Types.Date, default: new Date().toLocaleTimeString() },
    status: { type: Schema.Types.String, enum: ['Pending, In progress, In transit, Delivered'], default: 'Pending' }
});

const Order = model('Order', orderSchema);

module.exports = Order;
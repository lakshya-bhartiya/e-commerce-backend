const Order = require("./orders.model");

const orderService = {};

orderService.createOrder = async (data) => {
    const order = await Order.create(data);
    return order;
}

orderService.getOrderById = async (orderId) => {
    const order = await Order.findOne({ _id: orderId, isDeleted: false })
                             .populate("products.productId");
    return order;
}

orderService.getOrdersByUser = async (userId) => {
    const orders = await Order.find({ userId, isDeleted: false })
                              .populate("products.productId");
    return orders;
}

orderService.cancelOrder = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order || order.status !== 'Pending') return null;

    order.status = 'Cancelled';
    await order.save();
    return order;
}

module.exports = orderService;

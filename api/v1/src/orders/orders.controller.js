const orderService = require("./orders.service");

const orderController = {};

orderController.placeOrder = async (req, res) => {
    const { products, totalPrice } = req.body;
    const userId = req._id;

    try {
        const order = await orderService.createOrder({ userId, products, totalPrice });
        res.send({ status: true, msg: "Order placed successfully", data: order });
    } catch (error) {
        console.log(error);
        res.send({ status: false, msg: "Something went wrong", error: error.message });
    }
}

orderController.getOrderById = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await orderService.getOrderById(orderId);
        if (!order) return res.send({ status: false, msg: "Order not found", data: null });

        res.send({ status: true, msg: "Order fetched successfully", data: order });
    } catch (error) {
        console.log(error);
        res.send({ status: false, msg: "Something went wrong", error: error.message });
    }
}

orderController.getOrdersByUser = async (req, res) => {
    const userId = req._id;

    try {
        const orders = await orderService.getOrdersByUser(userId);
        res.send({ status: true, msg: "Orders fetched successfully", data: orders });
    } catch (error) {
        console.log(error);
        res.send({ status: false, msg: "Something went wrong", error: error.message });
    }
}

orderController.cancelOrder = async (req, res) => {
    const { orderId } = req.body;

    try {
        const order = await orderService.cancelOrder(orderId);
        if (!order) return res.send({ status: false, msg: "Invalid order or already processed" });

        res.send({ status: true, msg: "Order cancelled successfully", data: order });
    } catch (error) {
        console.log(error);
        res.send({ status: false, msg: "Something went wrong", error: error.message });
    }
}

module.exports = orderController;

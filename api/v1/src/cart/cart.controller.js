const cartService = require("./cart.service");
const productService = require("../product/product.service");
const cartController = {};

cartController.addToCart = async (req, res) => {
    const userId = req._id;
    const { productId, quantity } = req.body;

    try {
        const product = await productService.getProductById(productId);

        if (!product) {
            return res.send({ status: false, msg: "Product not found", data: null });
        }

        if (product.stock < quantity) {
            return res.send({ status: false, msg: "Insufficient stock", data: null });
        }

        const price = product.price;

        const cart = await cartService.addToCart(userId, productId, quantity, price);
        if (cart) {
            return res.send({ status: true, msg: "Product added to cart", data: cart });
        } else {
            return res.send({ status: false, msg: "Failed to add product to cart", data: null });
        }
    } catch (error) {
        console.log(error);
        return res.send({ status: false, msg: "Something went wrong", error: error.message });
    }
};

cartController.getCart = async (req, res) => {
    const userId = req._id;

    try {
        const cart = await cartService.getCartByUserId(userId);
        if (cart) {
            return res.send({ status: true, msg: "Cart fetched successfully", data: cart });
        } else {
            return res.send({ status: false, msg: "Cart is empty", data: null });
        }
    } catch (error) {
        console.log(error);
        return res.send({ status: false, msg: "Something went wrong", error: error.message });
    }
};

cartController.updateCartItem = async (req, res) => {
    const userId = req._id;
    const { productId, quantity } = req.body;

    try {
        const product = await productService.getProductById(productId);

        if (!product) {
            return res.send({ status: false, msg: "Product not found", data: null });
        }

        if (product.stock < quantity) {
            return res.send({ status: false, msg: "Insufficient stock", data: null });
        }

        const updatedCart = await cartService.updateCartItem(userId, productId, quantity);
        if (updatedCart) {
            return res.send({ status: true, msg: "Cart updated successfully", data: updatedCart });
        } else {
            return res.send({ status: false, msg: "Failed to update cart", data: null });
        }
    } catch (error) {
        console.log(error);
        return res.send({ status: false, msg: "Something went wrong", error: error.message });
    }
};

cartController.removeCartItem = async (req, res) => {
    const userId = req._id;
    const { productId } = req.body;

    try {
        const updatedCart = await cartService.removeCartItem(userId, productId);
        if (updatedCart) {
            return res.send({ status: true, msg: "Product removed from cart", data: updatedCart });
        } else {
            return res.send({ status: false, msg: "Failed to remove product from cart", data: null });
        }
    } catch (error) {
        console.log(error);
        return res.send({ status: false, msg: "Something went wrong", error: error.message });
    }
};

module.exports = cartController;

const Cart = require("./cart.model");

const cartService = {};

cartService.addToCart = async (userId, productId, quantity, price) => {
    // Check if the user already has a cart
    let cart = await Cart.findOne({ userId });

    if (cart) {
        // Check if the product already exists in the cart
        const existingProductIndex = cart.products.findIndex(
            (product) => product.productId.toString() === productId
        );

        if (existingProductIndex !== -1) {
            // Update the quantity and price of the existing product
            cart.products[existingProductIndex].quantity += quantity;
            cart.products[existingProductIndex].price = price;
        } else {
            // Add the new product to the cart
            cart.products.push({ productId, quantity, price });
        }
    } else {
        // Create a new cart if it doesn’t exist
        cart = await Cart.create({
            userId,
            products: [{ productId, quantity, price }],
        });
    }

    return await cart.save();
};

cartService.getCartByUserId = async (userId) => {
    return await Cart.findOne({ userId, isDeleted: false }).populate("products.productId")
};

cartService.updateCartItem = async (userId, productId, quantity) => {
    const cart = await Cart.findOne({ userId });

    if (cart) {
        const existingProductIndex = cart.products.findIndex(
            (product) => product.productId.toString() === productId
        );

        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity = quantity;
            return await cart.save();
        }
    }

    return null;
};

cartService.removeCartItem = async (userId, productId) => {
    const cart = await Cart.findOne({ userId });

    if (cart) {
        cart.products = cart.products.filter(
            (product) => product.productId.toString() !== productId
        );
        return await cart.save();
    }

    return null;
};

module.exports = cartService;

const Product = require("./product.model");

const productService = {};

// ➡️ Create or Restore Product
productService.createProduct = async ({ name, price, description, category, stock, images }) => {
    const existingProduct = await Product.findOne({ name });

    // If the product is soft deleted, restore it
    if (existingProduct && existingProduct.isDeleted) {
        existingProduct.isDeleted = false;
        existingProduct.price = price;
        existingProduct.description = description;
        existingProduct.category = category;
        existingProduct.stock = stock;
        existingProduct.images = images;
        await existingProduct.save();
        return existingProduct;
    }

    // If product exists and not deleted, return null
    if (existingProduct) return null;

    // Create new product
    const newProduct = await Product.create({ name, price, description, category, stock, images });
    return newProduct;
};

productService.getAllProducts = async () => {
    const products = await Product.find({ isDeleted: false }).populate("category");
    return products;
};

productService.getProductById = async (id) => {
    const product = await Product.findOne({ _id: id, isDeleted: false }).populate("category");
    return product;
};

productService.updateProduct = async (id, data) => {
    const product = await Product.findOne({ _id: id });

    // If product is deleted, prevent update
    if (!product || product.isDeleted) return null;

    Object.assign(product, data);
    await product.save();
    return product;
};

// ➡️ Soft delete product
productService.softDeleteProduct = async (id) => {
    const product = await Product.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true }
    );
    return product;
};

module.exports = productService;

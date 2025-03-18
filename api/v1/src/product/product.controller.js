const productService = require("./product.service");

const productController = {};

// ➡️ Create or Restore Product
productController.createProduct = async (req, res) => {
    const { name, price, description, category, stock, images } = req.body;

    try {
        const product = await productService.createProduct({ name, price, description, category, stock, images });

        if (!product) {
            return res.send({ status: false, msg: "Product already exists", data: null });
        }

        const message = product.isDeleted ? "Product restored successfully" : "Product created successfully";
        return res.send({ status: true, msg: message, data: product });
    } catch (error) {
        console.error("Error creating product:", error);
        return res.send({ status: false, msg: "Something went wrong", error: error.message });
    }
};

// ➡️ Get All Products
productController.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        return res.send({ status: true, msg: "Products fetched successfully", data: products });
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.send({ status: false, msg: "Something went wrong", error: error.message });
    }
};

// ➡️ Get Product By ID
productController.getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await productService.getProductById(id);
        if (!product) {
            return res.send({ status: false, msg: "Product not found", data: null });
        }
        return res.send({ status: true, msg: "Product fetched successfully", data: product });
    } catch (error) {
        console.error("Error fetching product:", error);
        return res.send({ status: false, msg: "Something went wrong", error: error.message });
    }
};

// ➡️ Update Product
productController.updateProduct = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const updatedProduct = await productService.updateProduct(id, data);
        if (!updatedProduct) {
            return res.send({ status: false, msg: "Product not found or is deleted", data: null });
        }
        return res.send({ status: true, msg: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        return res.send({ status: false, msg: "Something went wrong", error: error.message });
    }
};

// ➡️ Soft Delete Product
productController.softDeleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await productService.softDeleteProduct(id);
        if (!deletedProduct) {
            return res.send({ status: false, msg: "Product not found or already deleted", data: null });
        }
        return res.send({ status: true, msg: "Product deleted successfully", data: deletedProduct });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.send({ status: false, msg: "Something went wrong", error: error.message });
    }
};

module.exports = productController;

const express = require("express");
const productController = require("./product.controller");
const validate = require("../../middleware/middleware.validation");
const { productValidationSchema } = require("./product.validation");
const authMiddleware = require("../../middleware/authHelper");

const router = express.Router();

// ➡️ Create or Restore Product
router.post("/", authMiddleware, validate(productValidationSchema), productController.createProduct);

// ➡️ Get All Products
router.get("/all", authMiddleware, productController.getAllProducts);

// ➡️ Get Product by ID
router.get("/:id", authMiddleware, productController.getProductById);

// ➡️ Update Product
router.put("/:id", authMiddleware, validate(productValidationSchema), productController.updateProduct);

// ➡️ Soft Delete Product
router.delete("/:id", authMiddleware, productController.softDeleteProduct);

module.exports = router;

const express = require("express");
const categoryController = require("./category.controller");
const authMiddleware = require("../../middleware/authHelper");
const validate = require("../../middleware/middleware.validation");
const  categoryValidationSchema  = require("./category.validation");

const router = express.Router();

router.post("/create", authMiddleware, validate(categoryValidationSchema), categoryController.createCategory);
router.get("/", authMiddleware, categoryController.getAllCategories);
router.get("/:id", authMiddleware, categoryController.getCategoryById);
router.put("/:id", authMiddleware, validate(categoryValidationSchema), categoryController.updateCategory);
router.delete("/:id", authMiddleware, categoryController.deleteCategory);

module.exports = router;

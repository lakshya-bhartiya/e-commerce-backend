const categoryService = require("./category.service");
const categoryController = {};

categoryController.createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const category = await categoryService.createOrRestoreCategory({ name });
        if (!category) {
            return res.send({ status: false, msg: "Category already exists" });
        }
        return res.send({ status: true, msg: "Category created successfully", data: category });
    } catch (err) {
        return res.send({ status: false, msg: "Something went wrong", error: err.message });
    }
};


categoryController.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        return res.send({ status: true, msg: "Categories fetched successfully", data: categories });
    } catch (err) {
        return res.send({ status: false, msg: "Something went wrong", error: err.message });
    }
};

categoryController.getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await categoryService.getCategoryById(id);
        if (!category) {
            return res.send({ status: false, msg: "Category not found" });
        }
        return res.send({ status: true, msg: "Category fetched successfully", data: category });
    } catch (err) {
        return res.send({ status: false, msg: "Something went wrong", error: err.message });
    }
};

categoryController.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedCategory = await categoryService.updateCategory(id, { name });
        if (!updatedCategory) {
            return res.send({ status: false, msg: "Category not found or already deleted" });
        }
        return res.send({ status: true, msg: "Category updated successfully", data: updatedCategory });
    } catch (err) {
        return res.send({ status: false, msg: "Something went wrong", error: err.message });
    }
};


categoryController.deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await categoryService.deleteCategory(id);
        if (!deletedCategory) {
            return res.send({ status: false, msg: "Category not found or already deleted" });
        }
        return res.send({ status: true, msg: "Category deleted successfully" });
    } catch (err) {
        return res.send({ status: false, msg: "Something went wrong", error: err.message });
    }
};

module.exports = categoryController;

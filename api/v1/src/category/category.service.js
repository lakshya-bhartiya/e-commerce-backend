const Category = require("./category.model");

const categoryService = {};

categoryService.createOrRestoreCategory = async ({ name }) => {
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
        if (existingCategory.isDeleted) {
            // Restore the category and update the name
            existingCategory.isDeleted = false;
            existingCategory.name = name;
            await existingCategory.save();
            return existingCategory;
        } else {
            return null; // Category already exists and is not deleted
        }
    }

    // Create a new category if it doesn't exist
    const newCategory = await Category.create({ name });
    return newCategory;
};


categoryService.getAllCategories = async () => {
    const categories = await Category.find({ isDeleted: false });
    return categories;
};

categoryService.categoryExists = async (name) => {
    return await Category.findOne({ name });
};

categoryService.getCategoryById = async (id) => {
    const category = await Category.findOne({ _id: id, isDeleted: false });
    return category;
};

categoryService.updateCategory = async (id, data) => {
    const category = await Category.findById(id);
    if (!category || category.isDeleted) {
        return null; // Prevent updating a deleted category
    }
    const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true });
    return updatedCategory;
};


categoryService.deleteCategory = async (id) => {
    const category = await Category.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    
    return category;
};

module.exports = categoryService;

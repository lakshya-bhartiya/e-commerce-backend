const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    images: [{
        type: String,
        trim: true,
    }],
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);

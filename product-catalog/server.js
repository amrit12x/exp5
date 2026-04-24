const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/catalogDB')
.then(() => console.log("MongoDB Connected"));

// Nested Schema
const variantSchema = new mongoose.Schema({
    sku: String,
    color: String,
    price: Number,
    stock: Number
});

const reviewSchema = new mongoose.Schema({
    userId: String,
    rating: Number,
    comment: String
});

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    variants: [variantSchema],
    reviews: [reviewSchema]
});

const Product = mongoose.model('Catalog', productSchema);

// Create
app.post('/catalog', async (req, res) => {
    const product = await Product.create(req.body);
    res.json(product);
});

// Aggregation example
app.get('/catalog/stats', async (req, res) => {
    const data = await Product.aggregate([
        { $unwind: "$variants" },
        {
            $group: {
                _id: "$name",
                totalStock: { $sum: "$variants.stock" }
            }
        }
    ]);
    res.json(data);
});

app.listen(3000, () => console.log("Server running"));
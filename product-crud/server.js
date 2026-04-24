const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/productsDB')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: String,
    inStock: Boolean
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// CREATE
app.post('/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
});

// READ
app.get('/products', async (req, res) => {
    const data = await Product.find();
    res.json(data);
});

// UPDATE
app.put('/products/:id', async (req, res) => {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

// DELETE
app.delete('/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.send("Deleted");
});

app.listen(3000, () => console.log("Server running"));
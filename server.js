cconst express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));


// MongoDB Connection

mongoose.connect('mongodb://127.0.0.1:27017/wishlistDB')
.then(() => console.log("Database Connected"))
.catch(err => console.log(err));


// Product Schema

const productSchema = new mongoose.Schema({
    productName: String,
    productURL: String,
    currentPrice: Number,
    targetPrice: Number
});

const Product = mongoose.model('Product', productSchema);


// Home Route

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
});


// Add Product

app.post('/add-product', async(req,res)=>{

    const product = new Product({
        productName:req.body.productName,
        productURL:req.body.productURL,
        currentPrice:req.body.currentPrice,
        targetPrice:req.body.targetPrice
    });

    await product.save();

    res.send("Product Added Successfully");
});


// Get Products

app.get('/products', async(req,res)=>{

    const products = await Product.find();

    res.json(products);
});

app.delete('/delete-product/:id', async(req,res)=>{

await Product.findByIdAndDelete(req.params.id);

res.send("Deleted");

});


// Price Tracker

app.get('/track-price', async(req,res)=>{

    const products = await Product.find();

    products.forEach(product=>{

        if(product.currentPrice <= product.targetPrice){

            console.log(
                `Price Dropped for ${product.productName}`
            );
        }
    });

    res.send("Price Tracking Completed");
});


// Server

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) =>
// res.send('Home Page'));

//GLOBALS
var TEST_PROD_ID = 1002;
const OPTIONS = {new: true};
const FILTER = { ProductId : ((prodId) => {
  return this.prodId;
})};

const charges = {
  'Electronics': {
    discount: 15, //in percentage
    gst: 18, //in percentage
    deliveryCharges: 350,
  },

  'Home Appliances': {
    discount: 22, //in percentage
    gst: 24, //in percentage
    deliveryCharges: 800,
  },

  'Clothing': {
    discount: 40, //in percentage
    gst: 12, //in percentage
    deliveryCharges: 0,
  },

  'Furniture': {
    discount: 10, //in percentage
    gst: 18, //in percentage
    deliveryCharges: 200,
  },
};


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/',  {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Schema for db
const ProductSchema = new mongoose.Schema({
  ProductId: Number,
  ProductName: String,
  ProductType: String,
  ProductCategory: String,
  ProductPrice: Number,
  Discount: Number,
  Charges: {
    GST: Number,
    Delivery: Number,
  },
  FinalPrice: Number,
});

const Products = mongoose.model('Product', ProductSchema);



// getting all products
function getAllProducts() {
  // const options = OPTIONS;
  const filter = {};

  Products.find(filter, (err, data) => {
    if(err) console.log(err);
    else console.log(data) ;
  });
}

app.get('/get-all-products', (req, res) => {
  res.send(getAllProducts());
})




//TODO: user should be able to delete a product by passing ProductId
async function findAndDelete(prodId){
  const options = OPTIONS;
  const filter = FILTER;

  // Products.findOneAndDelete(condition, whether to return the updated document or not)
  const response = await Products.findOneAndDelete(filter, options, (err) => {if(err) console.log(err);})

  return response;
}

app.get('/delete-id', (req, res) => {
  res.send(findAndDelete(TEST_PROD_ID));
});

//TODO: update the product using ProductId
async function update(prodId){
  const options = OPTIONS;
  const filter = FILTER;
  const update = { ProductName : '', ProductPrice: 0, ProductCategory : '', ProductType : '', ProductId : 0};

  // Products.findOneAndUpdate(condition, updates value, whether to return the updated document or not)
  const response = await Products.findOneAndUpdate(filter, update, options, (err) => {if(err) console.log(err);});
  return response;
}

app.get('/update', (req, res) => {
  res.send(update(TEST_PROD_ID));
} )

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

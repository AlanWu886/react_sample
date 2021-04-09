const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const fs = require('fs');

const Product = require("../models/product"); // User model

//change to post
router.post("/create", (req, res) => {
  const {category, name, description, memo, spec} = req.body
  if (!name || !category) {
    return res.status(400).json({ msg: "Please enter all required fields" });
  }

  Product.findOne({name:name})
  .then(product =>{
    if (product) {
      return res.status(400).json({ msg: "Product already exsists" })
    }

    const newProduct = {
      category: category,
      name:name,
      description:description,
      memo:memo,
      spec:spec
    }

    newProduct.save()
    .then(()=>{
      return res.status(200).json({ msg: "Product inserted", product:newProduct })
    })
    .catch(err=>console.log(err))
  })
  .catch(err=>console.log(err))

})

router.get("/createMany", (req, res) => {
  const {category, name, description, memo, spec} = req.body
  const listPath = __dirname + '/../../src/productData/product.json'
  const productList = JSON.parse(fs.readFileSync(listPath, 'utf-8'));
  // console.log(productList);
  var products = []
  Object.keys(productList).map(key=>{
    if (key === 'racquet') {
      console.log(key);
      productList[key].map(item=>{
        console.log(key, item);
        products.push({
          category:key,
          name:item.name,
          description:item.description,
          memo:item.memo,
          spec:item.spec
        })
      })
    }
  })
  console.log(products);
  // res.json({msg:products, count: products.length} ).end()
  Product.insertMany(products)
  .then(function(){
      console.log("Data inserted")
      res.json({msg:products, count: products.length} ).end()  // Success
  }).catch(function(error){
      res.json({error:error, msg: products}).end()
  });

})


// change to post
router.get("/update", (req, res) => {
  Product.updateMany({}, {category: 'string'})
  .then(function(){
      console.log("Data inserted")
      res.json({msg:'success'}).end()  // Success
  }).catch(function(error){
      console.log(error)      // Failure
      res.json({error:error}).end()
  });

})

router.get("/getProducts", (req, res) => {

  Product.find({})
  .then((data)=>{
      // console.log(data);

      return res.status(200).json({status:'success', data:data})  // Success
  }).catch(function(error){
      console.log(error)      // Failure
      res.json({error:error}).end()
  });

})


module.exports = router;

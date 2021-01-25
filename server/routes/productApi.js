const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const fs = require('fs');

const Product = require("../models/product"); // User model

router.get("/create", (req, res) => {
  const listPath = __dirname + '/../../src/productData/product.json'
  const productList = JSON.parse(fs.readFileSync(listPath, 'utf-8'));
  // const productList = new Array(products.racquets)
  console.log(productList);
  // res.json({msg:productList, item:productList[0]}  ).end()
  Product.insertMany(productList.racquets)
  .then(function(){
      console.log("Data inserted")
      res.json({msg:productList}).end()  // Success
  }).catch(function(error){
      console.log(error)      // Failure
      res.json({error:error, msg: productList}).end()
  });

})


module.exports = router;

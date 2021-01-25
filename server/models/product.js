const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  category:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true,
    unique : true,
    dropDups: true
  },
  description:{
    type: String
  },
  memo:{
    type: String
  },
  spec:{
    type: Array
  },
  image:{
    type: Array
  }
},
{ timestamp:true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

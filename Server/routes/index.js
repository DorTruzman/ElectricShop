const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded( { extended: true }));
const methodOverride = require('method-override');
const Product = require("../models/product");
const UserSchema = require("../models/user");
const TypeSchema = require("../models/type");
app.use(methodOverride('_method'));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/local', { useNewUrlParser: true })
    .then(() => {
      console.log("mongo connection open!!");
    }).catch(err => {
  console.log("no connection start");
})

// Products
app.post('/newProduct', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json({newProduct});
})

app.post('/updateProduct', async (req, res) => {
  await Product.findOneAndUpdate({_id: req.query._id}, {$set: req.body}, {'new': true});

  await Product.aggregate(
      [{ $match:
            { _id: mongoose.Types.ObjectId(req.query._id)}
      },
        {
          $lookup: {
            from: "type",
            localField: "type",
            foreignField: "id",
            as: "type"
          }
        }]
  ).exec(function(err, product){
    if(product && product.length != 0) {
      product[0].type = product[0].type[0].name;
    }
    res.json({product});
  });
})

app.delete('/product', async (req, res) => {
  const product = await Product.findByIdAndDelete(req.query._id);
  res.json({product});
})

app.get('/products', async (req, res) => {
  await Product.aggregate([{
    $lookup: {
      from: "type",
      localField: "type",
      foreignField: "id",
      as: "type"
    }
  }]).exec(function(err, products){
    products.map(pro => { pro.type = pro.type[0].name});
    res.json({products});
  });
})

app.get('/getProductById', async (req, res) => {
  await Product.aggregate(
    [{ $match:
          { _id: mongoose.Types.ObjectId(req.query._id)}
    },
    {
      $lookup: {
        from: "type",
        localField: "type",
        foreignField: "id",
        as: "type"
      }
    }]
  ).exec(function(err, product){
    if(product && product.length != 0) {
      product[0].type = product[0].type[0].name;
    }
    res.json({product});
  });
})

app.get('/users', async (req, res) => {
  const users = await UserSchema.find({});
  console.log(users);
  res.json({users});
})

app.get('/user', async (req, res) => {
  const user = await UserSchema.find({ email: req.query.email});
  res.json({user});
})

app.post('/newUser', async (req, res) => {
  var newUser;
  try {
    newUser = new UserSchema(req.body);
    await newUser.save();
  }catch (e) {
    newUser = null;
  }
  res.json({newUser});
})

app.post('/updateUser', async (req, res) => {
  const updatedUser = await UserSchema.findOneAndUpdate({_id: req.query._id}, {$set: req.body});
  res.json({updatedUser});
})

app.listen(8000, () => {
  console.log("listening on port 8000!");
})
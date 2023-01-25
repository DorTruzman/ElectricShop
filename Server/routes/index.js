const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded( { extended: true }));
const methodOverride = require('method-override');
const Product = require("../models/product");
const UserSchema = require("../models/user");
app.use(methodOverride('_method'));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/local', { useNewUrlParser: true })
    .then(() => {
      console.log("mongo connection open!!");
    }).catch(err => {
  console.log("no connection start");
})

// Products
app.get('/products', async (req, res) => {
  const products = await Product.find({});
  console.log(products);
  res.json({products});
})

app.post('/newProduct', async (req, res) => {

  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json({newProduct});
})

app.post('/updateProduct', async (req, res) => {
  const updatedProduct = await Product.findOneAndUpdate({_id: req.query.id}, {$set: req.body}, {'new': true});
  console.log({_id: req.query.id}, {$set: req.body}, {'new': true});
  res.json({updatedProduct});
})

app.delete('/product', async (req, res) => {
  const pro = await Product.findByIdAndDelete(req.query.id);
  res.json({pro});
})

app.get('/product', async (req, res) => {
  const product = await Product.findById(req.query.id);
  res.json({product});
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



















//************ */

// app.use((req, res) => {

//     console.log("we got a new request");
//     res.send("<h1> we got your request ! thank you </h1>");
// });
// app.get('/', (req, res) => {

//         res.render('home.ejs');
//     });



//     app.get('/search', (req, res) => {

//         const { q } = req.query.split('&');
//         if (!q) {
//             res.send("error this is null");
//         }
//         else {
//             res.send(`this is the ${q[0]}  and ${q[1]} page`);
//         }

//     })

//     app.get('/r/:subreddit', (req, res) => {

//         const { subreddit } = req.params;
//         res.send(`this is my ${subreddit} page`);
//     });

//     app.get('/r/:subreddit/:postid', (req, res) => {

//         const { subreddit, postid } = req.params;
//         res.send(` this is the page of ${subreddit} and ${postid}`);
//     });

//     app.get('/cats', (req, res) => {

//         res.send("<h1> we got your request ! thank you from cats  </h1>");
//     });

//     app.get('/dogs', (req, res) => {

//         res.send("<h1> we got your request ! thank you from dogs </h1>");
//     });

//     app.get('*', (req, res) => {

//         res.send("<h1> i dont know what you want  </h1>");
//     });
    
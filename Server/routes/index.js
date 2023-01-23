const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded( { extended: true }));
//const Product = require('./models/it');
const methodOverride = require('method-override');
const Product = require("../models/product");
const UserSchema = require("../models/user");
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/local', { useNewUrlParser: true })
    .then(() => {
      console.log("mongo connection open!!");
    }).catch(err => {
  console.log("no connection start");
})


// TODO: fix
app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/edit' , {product});
})

// TODO: fix
app.post('/products/:id', async (req, res) => {

  const { id } = req.params;
  //   res.send(id);
  const pro = await Product.findByIdAndUpdate(id , req.body , {runValidators: true , new: true})
  res.redirect(`/product/${pro._id}`);
})

// TODO: fix
app.post('/product/:id', async (req, res) => {
  const { id } = req.params;
  const pro = await Product.findByIdAndDelete(id);
  res.redirect(`/products`);
})

// TODO: fix
app.post('/products/r', async (req, res) => {

  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/product/${newProduct._id}`);

})

app.get('/products', async (req, res) => {
  const products = await Product.find({});
  console.log(products);
  res.json({products});
  //res.render('products/index' , {products});
})

// TODO: fix
app.get('/product/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.json({product});
  //res.render('products/show' , {product});
})

app.get('/users', async (req, res) => {
  const users = await UserSchema.find({});
  console.log(users);
  res.json({users});
  //res.render('users/index' , {users});
})

// TODO: fix
app.get('/user/:email', async (req, res) => {
  const { email } = req.params;
  const user = await UserSchema.find({email});
  console.log(user);
  res.json({user});
  //res.render('users/index' , {users});
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
    
const express = require('express');
const morgan = require('morgan');
const blogRoutes = require("./routes/blogRoutes");
const mongoose = require('mongoose');
const Blog = require("./models/blog");
// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://kristinenyaga:krisnyaga@cluster0.4m3mbka.mongodb.net/";
// returns a promise - an async function
  // we only listen for requests once we are connected to the db incase our app heavily depends on data from database
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })

  .then(result => {
    app.listen(3700)
  })
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
// parses the data sent to an object in the request so that we can access the data
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// mongoose & mongo tests
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'new blog2',
//     snippet: 'about my second blog',
//     body: 'more about my second blog'
//   })
//   // save is an async function

//   blog.save()
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// app.get('/all-blogs', (req, res) => {
//   // find all blogs
//   Blog.find()
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// app.get('/single-blog', (req, res) => {
//   Blog.findById("64760d3e7b704310f680a2b9")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
// only use when route begins with /blogs
app.use('/blogs',blogRoutes);
// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
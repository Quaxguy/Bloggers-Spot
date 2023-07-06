// const express = require('express');
// //express app
// const app = express();

// //register view engine (to render dynamic data in templates)
// app.set('view engine', 'ejs');//itlooks in folder named views
// //app.set('views','my views'); an example to set views with different name .


// //listen for request
// app.listen(3000);
// //routing
// //non ejs method
// // app.get('/' , (req, res) => {
// //     // res.send('<p>hello</p>'); //set header is included in response
// //     res.sendFile('./views/landing.html' ,{root: __dirname});
// // });
// //ejs method(view engine)
// app.get('/' , (req, res) => {
//     // res.send('<p>hello</p>'); //set header is included in response
//     res.render('indexf');
// });

// app.get('/about' , (req, res) => {
//     // res.send('<p>hello</p>'); //set header is included in response
//     res.sendFile('./views/about.html' ,{root: __dirname});
// });

// app.get('/about-us' , (req, res) => {
//     // res.send('<p>hello</p>'); //set header is included in response
//     res.redirect('/about');//redirecting routes
// });

// //404 page
// app.use( (req, res) =>{
//     res.status(404).sendFile('./views/404err.html' , {root: __dirname});//iterates through allroutes if no name matches then fires it off
// });//must be at bottom to try to fire for every request

const express = require('express');
//including third party middleware
const morgan = require('morgan');
//mongoose
const mongoose = require('mongoose');
//importing models
// const Blog = require('./models/blogs');
// const { render } = require('ejs');
const blogRoutes = require('./routes/blogroutes');


// express app
const app = express();


//connect to mongodb server
const uri = 'mongodb+srv://Quaxguy:Quaxguy95@cluster0.sbnlala.mongodb.net/note-tuts?retryWrites=true&w=majority';
mongoose.connect(uri)
  .then(function(result){
    console.log('connected to db');
    // listen for requests
    app.listen(3000);//start listening to req only after connected to mongodb server
  })
  .catch(function(err){
    console.log(err);
  });


// register view engine
app.set('view engine', 'ejs');

//middleware and static files
app.use(express.static('public'));


// app.set('views', 'myviews');

//set middleware for post request parsing
app.use(express.urlencoded({extended: true}));//middlewareto parse url encoded post request data to an request object



//exclaiming how a middleware works
// app.use(function(req, res,next){
//   console.log("new request made");
//   console.log("host:" , req.hostname);
//   console.log("path:" , req.path);
//   console.log("method:" , req.method);
//   next();//move on
// });//browser hangs so we use next()
//use third party middleware so that we dont have to type manually all above called as morgan

app.use(morgan('dev'));
//can use tiny also

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


//creaating a new blog
// app.get('/blogs/create', (req, res) => {
//   res.render('create', { title: 'Create a new blog' });
// }); 


//mongoose and mongo sandbox routes
// app.get('/add-blog', function(req , res){
//   const blogadd = new Blog({//instance of Blog object imported from models
//     title :'second new blog',
//     snippet :'first new snippet',
//     body : 'first new body'
//   });

 
// //getting all blogsfrom the database

//   blogadd.save()
//   .then(function(result){
//     res.send(result);
//   })
//   .catch(function(err){
//     console.log(err);
//   })



// });

// app.post('/blogs', function(req, res){
//   console.log(req.body);//req.body mei jo create pe info fill karke submit karte woh rehti
//   const blog = new Blog(req.body);
//   //saving to database
//   blog.save()
//       .then(function(result){
//         res.redirect('/blogs');
//       })
//       .catch(function(err){
//         console.log(err);
//       })

// })

//handling blogs by id get request
// app.get('/blogs/:id', function(req, res){
//   const id = req.params.id;
//   console.log(id);
//   Blog.findById(id)
//   .then(function(result){
//     res.render('details' , {blogdetails: result , title: 'Blog Details'}) //use this object properrty only in ejs file ie. blogdetails
//   })
//   .catch(function(err){
//     console.log(err);
//   }) 
//   });


// app.get('/all-blog', function(req, res){
//   Blog.find()
//   .then(function(result){
//     res.send(result);
//   })
//   .catch(function(err){
//     console.log(err);
//   })
    
// });

app.get('/', (req, res) => {
  // const blogs = [
  //   {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet fonsectetur'},
  //   {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //   {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  // ];
  // res.render('indexf', { title: 'Home', blogs });
  res.redirect('/blogs');
});

// app.get('/blogs' , function (req, res) {
//   Blog.find() //use Blog.find().sort({createdAt:-1}) to get in reverse order of time stamps
//   .then(function(result){
//     res.render('indexf', { title: 'All-Blogs' , blogs:result});
//   })
//   .catch(function(err) {
//     console.log(err);
//   })

// })

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);



//deleting a blog individually cant place it below 404 ass 404 must be at bottom of page.
// app.delete('/blogs/:id', (req,res) => {
//   const id = req.params.id;

//   Blog.findByIdAndDelete(id)
//       .then((result) => {
//           res.json({ redirect: '/blogs' })
//       })
//       .catch((err) => {
//           console.log(err);
//       });
// })



// 404 page is an middleware(code written between request and response, checks if response matches from top to bottom if not fires middleware )
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

//to embed the static files like css styling we use external static middleware


















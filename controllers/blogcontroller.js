const Blog = require('../models/blogs');





//blog_index blog_details blog_create_get blog_create_post blog_delete

//blog index function
const blog_index = (req,res) => {

    Blog.find() //use Blog.find().sort({createdAt:-1}) to get in reverse order of time stamps
        .then(function(result){
          res.render('indexf', { title: 'All-Blogs' , blogs:result});
        })
        .catch(function(err) {
          console.log(err);
        })

}

 //create new blog

 const blog_create_get = (req, res) => {
  res.render('create', { title: 'Create a new blog' });
}

//saving to database

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(result => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
}

//blog details function
const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then(result => {
        res.render('details', {blogdetails: result , title: 'Blog Details'});
      })
      .catch(err => {
        res.status(404).render('404' , {title: 'Blog not found'});
      });
  }

 

  //deleting a blog

  const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/' });
      })
      .catch(err => {
        console.log(err);
      });
  }
  


module.exports = {
    blog_index,
    blog_create_get, 
    blog_create_post,
    blog_details,  
    blog_delete
}
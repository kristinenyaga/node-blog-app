const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      // outputting documents in views
      // index is the file we want to send the data to and then the file can then output it
      res.render("blogs/index", { blogs: result, title: "All blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};
 
const blog_details = (req, res) => {
   const { id } = req.params;

   Blog.findById(id)
     .then((result) => {
       res.render("blogs/details", { blog: result, title: "Blog Details" });
     })
     .catch((err) => {
       res.status(404).render("404",{title:"Page Not Found"})
     });
}

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create a new blog" });
  
}

const blog_create_post = (req, res) => {
  const { title, snippet, body } = req.body;
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(req.body);
  
}

const blog_delete = (req, res) => {
  const { id } = req.params;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete
}
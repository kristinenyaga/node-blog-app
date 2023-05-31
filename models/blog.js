const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
}, { timestamps: true });
// timestamps provides us with createdAt and updatedAt properties

// FIRSTARG  is the model's name the name matters a lot since mongoose will look at the name plularize it and look for a collection called Blogs to communicate with it
// SECONDARG schema we want to base the model on
// kila document unacreate ikue na hiyo structure iko kwa schema
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
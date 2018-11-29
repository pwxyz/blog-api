
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String },
  url: { type: String },
  comments_url: { type: String },
  created_at: { type: Number },
  updated_at: { type: Number },
  body: { type: String },
  labels: { type: Array }
});

const Blog = mongoose.model('Blog', blogSchema);


export default Blog;
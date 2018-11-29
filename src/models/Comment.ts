
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  issue_url: { type: String },
  id: { type: Number },
  user: { type: Object },
  updated_at: { type: Number },
  created_at: { type: Number },
  body: { type: String }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
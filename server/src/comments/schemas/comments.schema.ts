import { Schema } from 'mongoose';
import { CommentsModel } from '../entities/comments.model';

export const CommentsSchema = new Schema<CommentsModel>({
  id: String,
  userRef: String,
  tweetRef: String,
  text: { type: String, required: false },
  media: [String],
  gif: { type: String, required: false },
  createdAt: String,
});

export default CommentsSchema;

import { Schema } from 'mongoose';
import { LikesModel } from '../entities/likes.model';

const LikesSchema = new Schema<LikesModel>({
  userRef: String,
  tweetRef: String,
});

export default LikesSchema;

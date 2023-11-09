import { Schema } from 'mongoose';
import { RetweetModel } from '../entities/retweet.model';

export const RetweetsSchema = new Schema({
  userRef: String,
  tweetRef: String,
});

export default RetweetsSchema;

import { Schema } from 'mongoose';
import { BookmarkModel } from '../entities/bookmark.model';

export const BookmarkSchema = new Schema<BookmarkModel>({
  userRef: String,
  tweetRef: String,
});

export default BookmarkSchema;

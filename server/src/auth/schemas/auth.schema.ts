import { Schema } from 'mongoose';
import { IUser } from '../interfaces/user';

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  pseudonym: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthday: { type: String, required: true },
  dateOfJoining: { type: String, required: true },
  description: String,
  avatar: {
    type: String,
    default:
      'https://res.cloudinary.com/dvpy1nsjp/image/upload/v1697540951/random.jpg',
  },
  profileBackground: String,
  website: String,
  bookmarks: { type: [String], ref: 'Tweet', default: [] },
  likes: {
    type: [
      {
        ref: String,
        refId: String,
      },
    ],
    default: [],
  },
  fontSizeLevel: { type: String, required: false },
  color: { type: String, required: false },
  theme: { type: String, required: false },
});

export default UserSchema;

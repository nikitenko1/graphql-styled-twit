import { Schema } from 'mongoose';
import { IToken } from '../interfaces/TokenInterfaces';

const TokenSchema = new Schema<IToken>({
  userId: String,
  refreshToken: String,
});

export default TokenSchema;

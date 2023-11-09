import { Schema } from 'mongoose';
import { IVerification } from '../interfaces/verification';

const VerificationSchema = new Schema<IVerification>(
  {
    code: { type: Number, maxlength: 6, required: true },
    forEmail: { type: String, required: true },
    expiresIn: { type: Date, required: true },
  },
  { timestamps: true },
);

VerificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

export default VerificationSchema;

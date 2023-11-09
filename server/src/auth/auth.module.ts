import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import UserSchema from './schemas/auth.schema';
import VerificationSchema from './schemas/verification.schema';
import FollowingSchema from 'src/following/schemas/following.schema';
import { TokensModule } from 'src/tokens/tokens.module';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
      { name: 'Verification', schema: VerificationSchema },
      { name: 'Following', schema: FollowingSchema },
    ]),
    TokensModule,
  ],
  providers: [AuthResolver, AuthService, EmailService],
})
export class AuthModule {}

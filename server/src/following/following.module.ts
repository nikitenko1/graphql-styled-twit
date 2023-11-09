import { Module } from '@nestjs/common';
import { FollowingService } from './following.service';
import { FollowingResolver } from './following.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import UserSchema from 'src/auth/schemas/auth.schema';
import TokenSchema from 'src/tokens/schemas/token.schema';
import FollowingSchema from './schemas/following.schema';
import { TokensService } from 'src/tokens/tokens.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
      { name: 'Token', schema: TokenSchema },
      { name: 'Following', schema: FollowingSchema },
    ]),
  ],
  providers: [FollowingResolver, FollowingService, TokensService],
  exports: [FollowingService],
})
export class FollowingModule {}

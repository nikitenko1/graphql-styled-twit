import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesResolver } from './likes.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import LikesSchema from './schemas/likes.schema';
import { TokensService } from 'src/tokens/tokens.service';
import TokenSchema from 'src/tokens/schemas/token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Likes', schema: LikesSchema },
      {
        name: 'Token',
        schema: TokenSchema,
      },
    ]),
  ],
  providers: [LikesService, LikesResolver, TokensService],
  exports: [LikesService],
})
export class LikesModule {}

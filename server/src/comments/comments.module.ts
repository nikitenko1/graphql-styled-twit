import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import CommentsSchema from './schemas/comments.schema';
import TokenSchema from 'src/tokens/schemas/token.schema';
import { TokensService } from 'src/tokens/tokens.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Comments',
        schema: CommentsSchema,
      },
      {
        name: 'Token',
        schema: TokenSchema,
      },
    ]),
  ],
  providers: [CommentsResolver, CommentsService, TokensService],
  exports: [CommentsService],
})
export class CommentsModule {}

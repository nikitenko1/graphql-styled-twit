import { Module } from '@nestjs/common';
import { HashtagsService } from './hashtags.service';
import { HashtagsResolver } from './hashtags.resolver';
import HashtagSchema from './schemas/hashtag.schema';
import { MongooseModule } from '@nestjs/mongoose';
import TokenSchema from 'src/tokens/schemas/token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Hashtag',
        schema: HashtagSchema,
      },
      { name: 'Token', schema: TokenSchema },
    ]),
  ],
  providers: [HashtagsService, HashtagsResolver],
  exports: [HashtagsService],
})
export class HashtagsModule {}

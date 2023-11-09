import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchResolver } from './search.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import AuthSchema from 'src/auth/schemas/auth.schema';
import HashtagSchema from 'src/hashtags/schemas/hashtag.schema';
import TweetSchema from 'src/tweets/schemas/tweet.schema';
import TokenSchema from 'src/tokens/schemas/token.schema';
import { TokensService } from 'src/tokens/tokens.service';
import { UserService } from 'src/user/user.service';
import { HashtagsService } from 'src/hashtags/hashtags.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Token',
        schema: TokenSchema,
      },
      {
        name: 'User',
        schema: AuthSchema,
      },
      {
        name: 'Hashtag',

        schema: HashtagSchema,
      },
      {
        name: 'Tweet',
        schema: TweetSchema,
      },
    ]),
  ],
  providers: [
    SearchResolver,
    SearchService,
    TokensService,
    UserService,
    HashtagsService,
  ],
  exports: [SearchService],
})
export class SearchModule {}

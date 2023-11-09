import { Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsResolver } from './tweets.resolver';
import UserSchema from 'src/auth/schemas/auth.schema';
import TweetSchema from './schemas/tweet.schema';
import { MongooseModule } from '@nestjs/mongoose';
import TokenSchema from 'src/tokens/schemas/token.schema';
import FollowingSchema from 'src/following/schemas/following.schema';
import LikesSchema from 'src/likes/schemas/likes.schema';
import CommentsSchema from 'src/comments/schemas/comments.schema';
import RetweetsSchema from 'src/retweets/schemas/retweets.schema';
import BookmarkSchema from 'src/bookmarks/schemas/bookmark.schema';
import HashtagSchema from 'src/hashtags/schemas/hashtag.schema';
import { TokensService } from 'src/tokens/tokens.service';
import { FilesService } from 'src/files/files.service';
import { FollowingService } from 'src/following/following.service';
import { LikesService } from 'src/likes/likes.service';
import { CommentsService } from 'src/comments/comments.service';
import { RetweetsService } from 'src/retweets/retweets.service';
import { BookmarksService } from 'src/bookmarks/bookmarks.service';
import { HashtagsService } from 'src/hashtags/hashtags.service';
import { SearchService } from 'src/search/search.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Tweet',
        schema: TweetSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
      {
        name: 'Token',
        schema: TokenSchema,
      },
      {
        name: 'Following',
        schema: FollowingSchema,
      },
      {
        name: 'Likes',
        schema: LikesSchema,
      },
      {
        name: 'Comments',
        schema: CommentsSchema,
      },
      {
        name: 'Retweets',
        schema: RetweetsSchema,
      },
      {
        name: 'Bookmark',
        schema: BookmarkSchema,
      },
      {
        name: 'Hashtag',
        schema: HashtagSchema,
      },
    ]),
  ],
  providers: [
    TweetsResolver,
    TweetsService,
    TokensService,
    FilesService,
    FollowingService,
    LikesService,
    TweetsService,
    CommentsService,
    RetweetsService,
    BookmarksService,
    HashtagsService,
    SearchService,
    UserService,
  ],
})
export class TweetsModule {}

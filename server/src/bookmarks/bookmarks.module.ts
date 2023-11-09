import { Module } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarksResolver } from './bookmarks.resolver';
import { TokensService } from 'src/tokens/tokens.service';
import { MongooseModule } from '@nestjs/mongoose';
import BookmarkSchema from './schemas/bookmark.schema';
import TokenSchema from 'src/tokens/schemas/token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Bookmark',
        schema: BookmarkSchema,
      },
      {
        name: 'Token',
        schema: TokenSchema,
      },
    ]),
  ],
  providers: [BookmarksService, BookmarksResolver, TokensService],
})
export class BookmarksModule {}

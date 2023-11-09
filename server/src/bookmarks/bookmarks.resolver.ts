import { Args, Context, ID, Mutation, Resolver } from '@nestjs/graphql';
import { BookmarksService } from './bookmarks.service';

import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/utils/auth.guard';
import { ContextWithUser } from 'src/declarations/graphqlContext';

@Resolver()
export class BookmarksResolver {
  constructor(private bookmarkService: BookmarksService) {}

  @Mutation((returns) => Boolean)
  @UseGuards(AuthGuard)
  async addBookmark(
    @Args('tweetId', { type: () => ID }) variable: string,
    @Context() context: ContextWithUser,
  ) {
    const userId = context.req.user.id;
    await this.bookmarkService.addBookmark(variable, userId);
    return true;
  }

  @Mutation((returns) => Boolean)
  @UseGuards(AuthGuard)
  async clearAllBookmarks(@Context() context: ContextWithUser) {
    const userId = context.req.user.id;
    await this.bookmarkService.clearAllBookmarks(userId);
    return true;
  }
}

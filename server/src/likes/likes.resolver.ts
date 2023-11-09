import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LikesService } from './likes.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/utils/auth.guard';
import { ContextWithUser } from 'src/declarations/graphqlContext';

@Resolver()
export class LikesResolver {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(AuthGuard)
  @Mutation((returns) => Boolean)
  async likeTweet(
    // Use the @Args() decorator to extract arguments from a request for use in the method handler
    @Args('tweetRef', { type: () => String }) variable: string,
    @Context() context: ContextWithUser,
  ) {
    const userId = context.req.user.id;
    await this.likesService.likeTweet(userId, variable);
    return true;
  }
}

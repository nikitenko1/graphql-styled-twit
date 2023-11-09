import { Args, Context, ID, Mutation, Resolver } from '@nestjs/graphql';
import { RetweetsService } from './retweets.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/utils/auth.guard';
import { ContextWithUser } from 'src/declarations/graphqlContext';

@Resolver()
export class RetweetsResolver {
  constructor(private readonly retweetService: RetweetsService) {}

  @Mutation((returns) => Boolean)
  @UseGuards(AuthGuard)
  async retweet(
    // Use the @Args() decorator to extract arguments from a request for use in the method handler
    @Args('tweetId', { type: () => ID }) variable: string,
    @Context() context: ContextWithUser,
  ) {
    const userId = context.req.user.id;
    await this.retweetService.retweet(variable, userId);
    return true;
  }
}

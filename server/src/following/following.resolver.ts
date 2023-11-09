import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FollowingService } from './following.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/utils/auth.guard';
import { FollowingWithoutRefModel } from './entities/followingWithoutRef.model';

import { FollowerModel } from './entities/follower.model';
import { FollowInputType } from './inputs/follow.input';
import { ContextWithUser } from 'src/declarations/graphqlContext';

@Resolver()
export class FollowingResolver {
  constructor(private readonly followingService: FollowingService) {}

  @UseGuards(AuthGuard)
  @Query((returns) => FollowingWithoutRefModel)
  getFollowingData(
    @Args('pseudonym') variable: string,
    @Context() context: ContextWithUser,
  ) {
    const user = context.req.user;
    return this.followingService.getFollowingData(variable, user);
  }

  @UseGuards(AuthGuard)
  @Query((returns) => [FollowerModel])
  getFollowing(
    @Args('pseudonym') variable: string,
    @Context() context: ContextWithUser,
  ) {
    const user = context.req.user;
    return this.followingService.getFollowing(variable, user);
  }

  @UseGuards(AuthGuard)
  @Query((returns) => [FollowerModel])
  getFollowers(
    @Args('pseudonym') variable: string,
    @Context() context: ContextWithUser,
  ) {
    const user = context.req.user;
    return this.followingService.getFollowers(variable, user);
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => Boolean)
  async follow(
    // Use the @Args() decorator to extract arguments from a request for use in the method handler
    @Args('followData') variable: FollowInputType,
    @Context() context: ContextWithUser,
  ) {
    const user = context.req.user;
    return await this.followingService.follow(
      variable.pseudonym,
      user,
      variable.isUserFollowing,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => Boolean)
  async unfollow(
    // Use the @Args() decorator to extract arguments from a request for use in the method handler
    @Args('pseudonym', { type: () => String }) variable: string,
    @Context() context: ContextWithUser,
  ) {
    const user = context.req.user;
    return await this.followingService.unfollow(variable, user);
  }
}

import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TweetsService } from './tweets.service';
import { TweetInputType } from './inputs/tweet.input';
import { UseGuards } from '@nestjs/common';
import { TweetModel } from './entities/tweet.model';
import { AuthGuard } from 'src/utils/auth.guard';
import { TweetsOutputModel } from './entities/tweetsOutput.model';
import { TweetsHomeInputType } from './inputs/tweets.home.input ';
import { TweetSearchInputType } from './inputs/tweets.search.input ';
import { TweetCommunicateModel } from './entities/tweetCommunicateModel';
import { TweetsLimitInputType } from './inputs/tweets.limit.input';
import { ContextWithUser } from 'src/declarations/graphqlContext';

@Resolver()
export class TweetsResolver {
  constructor(private readonly tweetsService: TweetsService) {}

  @UseGuards(AuthGuard)
  @Mutation((returns) => TweetModel)
  async createTweet(
    // Use the @Args() decorator to extract arguments from a request for use in the method handler
    @Args('tweetData') variable: TweetInputType,
    @Context() context: ContextWithUser,
  ) {
    const user = context.req.user;

    return await this.tweetsService.createTweet(variable, user);
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => Boolean)
  async deleteTweet(
    // Use the @Args() decorator to extract arguments from a request for use in the method handler
    @Args('tweetId') variable: string,
  ) {
    return await this.tweetsService.deleteTweet(variable);
  }

  @UseGuards(AuthGuard)
  @Query((returns) => TweetModel)
  async getTweetById(
    // Use the @Args() decorator to extract arguments from a request for use in the method handler
    @Args('tweetId', { type: () => String }) variable: string,
  ) {
    return await this.tweetsService.getTweetById(variable);
  }

  @UseGuards(AuthGuard)
  @Query((returns) => TweetsOutputModel)
  async getHomeTweets(
    @Args('HomeTweetsData') variable: TweetsHomeInputType,
    @Context() context: ContextWithUser,
  ) {
    const user = context.req.user;
    return await this.tweetsService.getHomeTweets(user, variable);
  }

  @UseGuards(AuthGuard)
  @Query((returns) => TweetsOutputModel)
  async getSearchedTweets(
    // Use the @Args() decorator to extract arguments from a request for use in the method handler
    @Args('tweetSearch') variable: TweetSearchInputType,
  ) {
    return await this.tweetsService.getSearchedTweets(variable);
  }

  @UseGuards(AuthGuard)
  @Query((returns) => TweetCommunicateModel)
  async getCommunicateData(
    // Use the @Args() decorator to extract arguments from a request for use in the method handler
    @Args('tweetId', { type: () => String }) variable: string,
    @Context() context: ContextWithUser,
  ) {
    const userId = context.req.user.id;
    return await this.tweetsService.getCommunicateData(variable, userId);
  }

  @UseGuards(AuthGuard)
  @Query((returns) => TweetsOutputModel)
  async getProfileTweets(
    // Use the @Args() decorator to extract arguments from a request for use in the method handler
    @Args('profileTweetsData') variable: TweetsLimitInputType,
  ) {
    return await this.tweetsService.getProfileTweets(variable);
  }

  @UseGuards(AuthGuard)
  @Query((returns) => TweetsOutputModel)
  async getRetweets(
    // Use the @Args() decorator to extract arguments from a request for use in the method handler
    @Args('profileTweetsData') variable: TweetsLimitInputType,
  ) {
    return await this.tweetsService.getRetweets(variable);
  }

  @UseGuards(AuthGuard)
  @Query((returns) => TweetsOutputModel)
  async getTweetsWithMedia(
    // Use the @Args() decorator to extract arguments from a request for use in the method handler
    @Args('profileTweetsData') variable: TweetsLimitInputType,
  ) {
    return await this.tweetsService.getMediaTweets(variable);
  }

  @UseGuards(AuthGuard)
  @Query((returns) => TweetsOutputModel)
  async getLikedTweets(
    // Use the @Args() decorator to extract arguments from a request for use in the method handler
    @Args('profileTweetsData') variable: TweetsLimitInputType,
  ) {
    return await this.tweetsService.getLikedTweets(variable);
  }

  @UseGuards(AuthGuard)
  @Query((returns) => TweetsOutputModel)
  async getBookmarks(
    @Args('profileTweetsData') variable: TweetsLimitInputType,
  ) {
    return await this.tweetsService.getBookmarks(variable);
  }

  @UseGuards(AuthGuard)
  @Query((returns) => TweetsOutputModel)
  async getAllTweets(
    // Use the @Args() decorator to extract arguments from a request for use in the method handler
    @Args('profileTweetsData') variable: TweetsLimitInputType,
  ) {
    return await this.tweetsService.getAllTweets(variable);
  }
}

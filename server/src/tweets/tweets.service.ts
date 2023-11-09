import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/auth/interfaces/user';
import { TweetModel } from './entities/tweet.model';
import { FilesService } from 'src/files/files.service';
import { FollowingService } from 'src/following/following.service';
import { LikesService } from 'src/likes/likes.service';
import { CommentsService } from 'src/comments/comments.service';
import { RetweetsService } from 'src/retweets/retweets.service';
import { BookmarksService } from 'src/bookmarks/bookmarks.service';
import { HashtagsService } from 'src/hashtags/hashtags.service';
import { SearchService } from 'src/search/search.service';
import { TweetInputType } from './inputs/tweet.input';
import { UserDto } from 'src/auth/dto/user-dto';
import { TweetsHomeInputType } from './inputs/tweets.home.input ';
import { HttpException, HttpStatus } from '@nestjs/common';
import TweetDto from './dto/tweet.dto';
import { TweetsLimitInputType } from './inputs/tweets.limit.input';
import { TweetSearchInputType } from './inputs/tweets.search.input ';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel('User') private userSchema: Model<IUser>,
    @InjectModel('Tweet') private tweetSchema: Model<TweetModel>,
    private filesService: FilesService,
    private followingService: FollowingService,
    private likesService: LikesService,
    private commentsService: CommentsService,
    private retweetsService: RetweetsService,
    private bookmarkService: BookmarksService,
    private hashtagsService: HashtagsService,
    private searchService: SearchService,
  ) {}

  private async getUserTweets(pseudonym) {
    return this.tweetSchema.find({ userRef: pseudonym });
  }

  async createTweet(tweetData: TweetInputType, user: UserDto) {
    let media;
    const hashtags = tweetData.text.match(/(#+[a-zA-Z0-9(_)]{1,})/gi);

    if (tweetData.media.length > 0)
      media = await Promise.all(
        tweetData.media.map((image) => this.filesService.generateImage(image)),
      );

    const newTweet = await this.tweetSchema.create({
      ...tweetData,
      userRef: user.pseudonym,
      media,
    });
    if (hashtags)
      await this.hashtagsService.addTweetToHashtag(hashtags, newTweet.id);

    return tweetData;
  }

  async deleteTweet(tweetId: string) {
    const tweet = await this.tweetSchema.findById(tweetId);
    const hashtags = tweet.text.match(/(#+[a-zA-Z0-9(_)]{1,})/gi);

    if (hashtags)
      await this.hashtagsService.removeTweetFromHashtag(hashtags, tweetId);
    if (tweet.media.length !== 0) {
      await Promise.all(
        tweet.media.map(
          async (image) => await this.filesService.deleteFile(image),
        ),
      );
    }
    if (tweet.gif) await this.filesService.deleteFile(tweet.gif);
    await tweet.deleteOne();
    return true;
  }

  async getHomeTweets(user: UserDto, homeTweetsData: TweetsHomeInputType) {
    const followingData = await this.followingService.getFollowing(
      user.pseudonym,
      user,
    );
    if (followingData.length === 0)
      throw new HttpException('No following data', HttpStatus.NOT_FOUND);

    const allTweets = await Promise.all(
      followingData.map(
        async (user) => await this.getUserTweets(user.pseudonym),
      ),
    );
    const flatTweets = allTweets
      .flat()
      .map((tweet) => new TweetDto(tweet, tweet.id));
    let tweets;

    if (homeTweetsData.typeOfSearch === 'latest')
      tweets = flatTweets.sort(
        (firstTweet, secondTweet) =>
          new Date(secondTweet.createdAt).getTime() -
          new Date(firstTweet.createdAt).getTime(),
      );
    else {
      const tweetsWithLikes = await Promise.all(
        flatTweets.map(async (tweet) => {
          const tweetLikes = await this.likesService.getTweetLikes(tweet.id);
          return {
            ...tweet,
            tweetLikes,
          };
        }),
      );
      tweets = tweetsWithLikes.sort(
        (firstTweet, secondTweet) =>
          secondTweet.tweetLikes - firstTweet.tweetLikes,
      );
    }
    return {
      tweets: tweets.slice(
        homeTweetsData.limit,
        homeTweetsData.limit + homeTweetsData.initialLimit,
      ),
      hasMore: flatTweets.length > homeTweetsData.limit,
    };
  }

  async getSearchedTweets(tweetSearch: TweetSearchInputType) {
    const foundTweets = await this.searchService.getSearchedTweets(
      tweetSearch.searchRequest,
    );

    if (foundTweets.length === 0)
      throw new HttpException('Tweets not found', HttpStatus.NOT_FOUND);

    return {
      tweets: foundTweets
        .reverse()
        .slice(tweetSearch.limit, tweetSearch.limit + tweetSearch.initialLimit),
      hasMore: foundTweets.length > tweetSearch.limit,
    };
  }

  async getTweetById(tweetId: string) {
    if (tweetId.match(/^[0-9a-fA-F]{24}$/)) {
      const tweet = await this.tweetSchema.findById(tweetId);
      if (!tweet)
        throw new HttpException('Tweet not found', HttpStatus.NOT_FOUND);
      return tweet;
    } else {
      throw new HttpException('Tweet not found', HttpStatus.NOT_FOUND);
    }
  }

  async getCommunicateData(tweetId: string, userId: string) {
    const tweetLikes = await this.likesService.getTweetLikes(tweetId);
    const isUserLiked = await this.likesService.isUserLiked(tweetId, userId);
    const tweetComments = await this.commentsService.getCommentsAmount(tweetId);
    const tweetRetweets = await this.retweetsService.getRetweetsAmount(tweetId);
    const isUserRetweeted = await this.retweetsService.isUserRetweeted(
      tweetId,
      userId,
    );
    const isTweetBookmarked = await this.bookmarkService.isTweetBookmarked(
      tweetId,
      userId,
    );

    return {
      likes: tweetLikes,
      isUserLiked: !!isUserLiked,
      comments: tweetComments,
      retweets: tweetRetweets,
      isUserRetweeted: !!isUserRetweeted,
      isTweetBookmarked: !!isTweetBookmarked,
    };
  }

  async getProfileTweets(profileTweetsData: TweetsLimitInputType) {
    const allTweets = await this.tweetSchema.find({
      userRef: profileTweetsData.userPseudonym,
    });
    if (allTweets.length === 0)
      throw new HttpException(
        'async getProfileTweets No tweets',
        HttpStatus.NOT_FOUND,
      );
    return {
      tweets: allTweets
        .reverse()
        .slice(
          profileTweetsData.limit,
          profileTweetsData.limit + profileTweetsData.initialLimit,
        ),
      hasMore: allTweets.length > profileTweetsData.limit,
    };
  }

  async getRetweets(profileTweetsData: TweetsLimitInputType) {
    const user = await this.userSchema.findOne({
      pseudonym: profileTweetsData.userPseudonym,
    });
    const allRetweetedTweetsId = await this.retweetsService.getAllRetweets(
      user.id,
    );
    const allRetweetedTweets = await this.tweetSchema.find({
      _id: { $in: allRetweetedTweetsId.map((data) => data.tweetRef) },
    });
    if (allRetweetedTweets.length === 0)
      throw new HttpException('No retweets', HttpStatus.NOT_FOUND);

    return {
      tweets: allRetweetedTweets
        .reverse()
        .slice(
          profileTweetsData.limit,
          profileTweetsData.limit + profileTweetsData.initialLimit,
        ),
      hasMore: allRetweetedTweets.length > profileTweetsData.limit,
    };
  }

  async getMediaTweets(profileTweetsData: TweetsLimitInputType) {
    const allTweets = await this.tweetSchema.find({
      userRef: profileTweetsData.userPseudonym,
    });
    const tweetsWithMedia = allTweets.filter(
      (tweet) => tweet.media.length > 0 || tweet.gif,
    );
    if (tweetsWithMedia.length === 0)
      throw new HttpException('No tweets with media', HttpStatus.NOT_FOUND);

    return {
      tweets: tweetsWithMedia
        .reverse()
        .slice(
          profileTweetsData.limit,
          profileTweetsData.limit + profileTweetsData.initialLimit,
        ),
      hasMore: allTweets.length > profileTweetsData.limit,
    };
  }

  async getLikedTweets(profileTweetsData: TweetsLimitInputType) {
    const user = await this.userSchema.findOne({
      pseudonym: profileTweetsData.userPseudonym,
    });
    const allLikedTweets = await this.likesService.getAllLikedTweets(user.id);
    const likedTweets = await this.tweetSchema.find({
      _id: { $in: allLikedTweets.map((data) => data.tweetRef) },
    });
    if (likedTweets.length === 0)
      throw new HttpException('No liked tweets', HttpStatus.NOT_FOUND);

    return {
      tweets: likedTweets
        .reverse()
        .slice(
          profileTweetsData.limit,
          profileTweetsData.limit + profileTweetsData.initialLimit,
        ),
      hasMore: likedTweets.length > profileTweetsData.limit,
    };
  }

  async getBookmarks(profileTweetsData: TweetsLimitInputType) {
    const user = await this.userSchema.findOne({
      pseudonym: profileTweetsData.userPseudonym,
    });
    const allBookmarks = await this.bookmarkService.getAllBookmarks(user.id);
    const bookmarkedTweets = await this.tweetSchema.find({
      _id: { $in: allBookmarks.map((data) => data.tweetRef) },
    });
    if (bookmarkedTweets.length === 0)
      throw new HttpException('No liked tweets', HttpStatus.NOT_FOUND);

    return {
      tweets: bookmarkedTweets
        .reverse()
        .slice(
          profileTweetsData.limit,
          profileTweetsData.limit + profileTweetsData.initialLimit,
        ),
      hasMore: bookmarkedTweets.length > profileTweetsData.limit,
    };
  }

  async getAllTweets(profileTweetsData: TweetsLimitInputType) {
    const allTweets = await this.tweetSchema.find({
      userRef: { $ne: profileTweetsData.userPseudonym },
    });
    return {
      tweets: allTweets
        .reverse()
        .slice(
          profileTweetsData.limit,
          profileTweetsData.limit + profileTweetsData.initialLimit,
        ),
      hasMore: allTweets.length > profileTweetsData.limit,
    };
  }
}

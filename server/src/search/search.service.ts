import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/auth/dto/user-dto';
import { HashtagsService } from 'src/hashtags/hashtags.service';
import { TweetModel } from 'src/tweets/entities/tweet.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SearchService {
  private searchLimit = 14;

  constructor(
    @InjectModel('User') private userModel: Model<UserDto>,
    @InjectModel('Tweet') private tweetModel: Model<TweetModel>,
    private hashtagService: HashtagsService,
    private userService: UserService,
  ) {}

  async searchForResults(searchRequest: string, userId: string) {
    const foundUsers = await this.userService.getUsersByRegex(searchRequest);
    const foundHashtags =
      await this.hashtagService.getSearchedHashtags(searchRequest);

    let users;
    let hashtags;

    if (foundHashtags.length >= 7 && foundUsers.length >= 7) {
      users = foundUsers.slice(0, 7);
      hashtags = foundHashtags.slice(0, 7);
    } else if (foundHashtags.length >= 7 && foundUsers.length < 7) {
      hashtags = foundHashtags.slice(0, this.searchLimit - foundUsers.length);
      users = foundUsers;
    } else if (foundUsers.length >= 7 && foundHashtags.length < 7) {
      users = foundUsers.slice(0, this.searchLimit - foundHashtags.length);
      hashtags = foundHashtags;
    } else {
      users = foundUsers;
      hashtags = foundHashtags;
    }
    return {
      hashtags,
      users,
    };
  }

  async getRecommendedUsers(userId: string) {
    const allUsers = await this.userModel.find();

    if (allUsers.length <= 4)
      return allUsers.filter((user) => user.id !== userId);

    const recommendedUsers: UserDto[] = [];

    while (recommendedUsers.length !== 3) {
      const user = allUsers[Math.floor(Math.random() * allUsers.length)];
      if (
        user.id === userId ||
        recommendedUsers.find((userInArray) => userInArray.id === user.id)
      )
        continue;
      recommendedUsers.push(user);
    }
    return recommendedUsers;
  }

  async getSearchedTweets(searchRequest: string) {
    return this.tweetModel.find({
      text: { $regex: searchRequest, $options: 'i' },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LikesModel } from './entities/likes.model';

@Injectable()
export class LikesService {
  constructor(@InjectModel('Likes') private likesModel: Model<LikesModel>) {}

  async getTweetLikes(tweetRef: string) {
    const allLikes = await this.likesModel.find({ tweetRef });
    return allLikes.length;
  }

  async getAllLikedTweets(userId) {
    return this.likesModel.find({ userRef: userId });
  }

  async likeTweet(userId: string, tweetRef: string) {
    const possibleLike = await this.likesModel.findOne({
      userRef: userId,
      tweetRef,
    });
    if (possibleLike) {
      return this.likesModel.findOneAndDelete({ userRef: userId, tweetRef });
    }
    return this.likesModel.create({ userRef: userId, tweetRef });
  }

  async isUserLiked(tweetId: string, userId: string) {
    const tweetLikes = await this.likesModel.find({ tweetRef: tweetId });
    return tweetLikes.find((element) => element.userRef === userId);
  }
}

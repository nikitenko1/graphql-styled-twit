import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookmarkModel } from './entities/bookmark.model';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectModel('Bookmark') private bookmarkModel: Model<BookmarkModel>,
  ) {}

  async addBookmark(tweetId: string, userId: string) {
    const possibleBookmark = await this.bookmarkModel.findOne({
      tweetRef: tweetId,
      userRef: userId,
    });
    if (possibleBookmark) {
      return this.bookmarkModel.findOneAndDelete({
        tweetRef: tweetId,
        userRef: userId,
      });
    }
    return this.bookmarkModel.create({ tweetRef: tweetId, userRef: userId });
  }

  async getAllBookmarks(userId: string) {
    return this.bookmarkModel.find({ userRef: userId });
  }

  async isTweetBookmarked(tweetId: string, userId: string) {
    const allBookmarks = await this.bookmarkModel.find({ tweetRef: tweetId });
    return allBookmarks.find((item) => item.userRef === userId);
  }

  async clearAllBookmarks(userId: string) {
    return this.bookmarkModel.find({ userRef: userId }).deleteMany();
  }
}

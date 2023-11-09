import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentsModel } from './entities/comments.model';
import { CommentsInputType } from './inputs/comments.input';
import { CommentsFetchType } from './inputs/comments.fetch.input';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('Comments') private commentsModel: Model<CommentsModel>,
  ) {}

  async createComment(commentData: CommentsInputType, userPseudonym: string) {
    const newComment = await this.commentsModel.create({
      userRef: userPseudonym,
      ...commentData,
    });
    newComment.id = newComment._id;
    newComment.save();
  }

  async getCommentsAmount(tweetId: string) {
    const allTweets = await this.commentsModel.find({ tweetRef: tweetId });
    return allTweets.length;
  }

  async getAllComments(commentData: CommentsFetchType) {
    const allComments = await this.commentsModel.find({
      tweetRef: commentData.tweetId,
    });

    if (allComments.length === 0)
      throw new HttpException('No comments found', HttpStatus.NOT_FOUND);

    return {
      comments: allComments
        .reverse()
        .slice(commentData.limit, commentData.limit + commentData.initialLimit),
      hasMore: allComments.length > commentData.limit,
    };
  }

  async getCommentById(commentId: string) {
    const comment = await this.commentsModel.findById(commentId);
    if (!comment)
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    return comment;
  }
}

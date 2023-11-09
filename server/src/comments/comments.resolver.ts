import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { UseGuards } from '@nestjs/common';

import { CommentsInputType } from './inputs/comments.input';

import { CommentsFetchType } from './inputs/comments.fetch.input';
import { CommentsOutputModel } from './entities/commentsOutput-model';
import { CommentsModel } from './entities/comments.model';
import { ContextWithUser } from 'src/declarations/graphqlContext';
import { AuthGuard } from 'src/utils/auth.guard';

@Resolver()
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation((returns) => Boolean)
  @UseGuards(AuthGuard)
  async createComment(
    // Use the @Args() decorator to extract arguments from a request for use in the method handler
    @Args('commentData') variable: CommentsInputType,
    @Context() context: ContextWithUser,
  ) {
    const userPseudonym = context.req.user.pseudonym;
    await this.commentsService.createComment(variable, userPseudonym);
    return true;
  }

  @Query((returns) => CommentsOutputModel)
  @UseGuards(AuthGuard)
  async getAllComments(
    // Use the @Args() decorator to extract arguments from a request for use in the method handler
    @Args('commentData') variable: CommentsFetchType,
  ) {
    return await this.commentsService.getAllComments(variable);
  }

  @Query((returns) => CommentsModel)
  @UseGuards(AuthGuard)
  async getCommentById(
    // Use the @Args() decorator to extract arguments from a request for use in the method handler
    @Args('commentId', { type: () => String }) variable: string,
  ) {
    return await this.commentsService.getCommentById(variable);
  }
}

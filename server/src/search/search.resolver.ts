import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { SearchService } from './search.service';
import { SearchForResultsModel } from './entities/searchForResults.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/utils/auth.guard';
import { UserModel } from 'src/user/entities/user.model';
import { ContextWithUser } from 'src/declarations/graphqlContext';

@Resolver()
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query((returns) => SearchForResultsModel)
  @UseGuards(AuthGuard)
  async searchForResults(
    @Args('searchRequest', { type: () => String }) variable: string,
    @Context() context: ContextWithUser,
  ) {
    const userId = context.req.user.id;
    return await this.searchService.searchForResults(variable, userId);
  }

  @Query((returns) => [UserModel])
  @UseGuards(AuthGuard)
  async getRecommendedUsers(@Context() context: ContextWithUser) {
    const userId = context.req.user.id;
    return await this.searchService.getRecommendedUsers(userId);
  }
}

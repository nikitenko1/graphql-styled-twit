import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './entities/user.model';
import { UserSearchOutputModel } from './entities/userSearchOutput.model';
import { UsersSearchInputModel } from './entities/usersSearch-input.model';

@Resolver((of) => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => UserModel)
  // Use the @Args() decorator to extract arguments from a request for use in the method handler
  async getUser(@Args('pseudonym', { type: () => String }) variable: string) {
    return await this.userService.getUser(variable);
  }

  @Query((returns) => UserSearchOutputModel)
  async getSearchedUsers(
    // Use the @Args() decorator to extract arguments from a request for use in the method handler
    @Args('usersSearch') variable: UsersSearchInputModel,
  ) {
    return await this.userService.getSearchedUsers(variable);
  }
}

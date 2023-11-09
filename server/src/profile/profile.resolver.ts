import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { ProfileModel } from './entities/profile.model';
import { ProfileInputType } from './inputs/profile.input';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/utils/auth.guard';
import { ContextWithUser } from 'src/declarations/graphqlContext';

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation((returns) => ProfileModel)
  @UseGuards(AuthGuard)
  async saveChanges(
    // Use the @Args() decorator to extract arguments from a request for use in the method handler
    @Args('profile') variable: ProfileInputType,
    @Context() context: ContextWithUser,
  ) {
    const user = context.req.user;

    if (
      variable.website !== '' &&
      variable.website &&
      !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi.test(
        variable.website,
      )
    )
      throw new HttpException(
        'Please, enter correct website',
        HttpStatus.BAD_REQUEST,
      );
    return await this.profileService.updateProfile(variable, user);
  }
}

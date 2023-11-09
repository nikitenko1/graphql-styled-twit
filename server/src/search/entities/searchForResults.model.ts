// The @Field() decorator accepts an optional type function (e.g., type => Int), and optionally an options object
// The options object can have any of the following key/value pairs:

import { Field, ObjectType } from '@nestjs/graphql';
import { HashtagModel } from 'src/hashtags/entities/hashtag.model';
import { UserModel } from 'src/user/entities/user.model';

// nullable: for specifying whether a field is nullable (in SDL, each field is non-nullable by default); boolean
// description: for setting a field description; string
// deprecationReason: for marking a field as deprecated; string

@ObjectType('SearchForResults')
export class SearchForResultsModel {
  @Field((type) => [HashtagModel], {
    nullable: true,
    description: 'Result of search',
  })
  hashtags: HashtagModel[];
  @Field((type) => [UserModel], {
    nullable: true,
    description: 'Result of search',
  })
  users: UserModel[];
}

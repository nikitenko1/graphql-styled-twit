import { Field, ID, ObjectType } from '@nestjs/graphql';

// The @Field() decorator accepts an optional type function (e.g., type => Int), and optionally an options object
// The options object can have any of the following key/value pairs:

// nullable: for specifying whether a field is nullable (in SDL, each field is non-nullable by default); boolean
// description: for setting a field description; string
// deprecationReason: for marking a field as deprecated; string

@ObjectType({ description: 'Followers and following' })
export class FollowingModel {
  @Field((type) => ID, { description: 'User id' })
  userRef: string;
  @Field((type) => [String], { description: 'All followers', defaultValue: [] })
  followers: string[];
  @Field({ description: 'Followers amount', defaultValue: 0 })
  followersAmount: number;
  @Field((type) => [String], { description: 'All following', defaultValue: [] })
  following: string[];
  @Field({ description: 'Following amount', defaultValue: 0 })
  followingAmount: number;
  @Field({ description: 'Is user following' })
  isUserFollowing: boolean;
}

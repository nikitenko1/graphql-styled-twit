import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from './user.model';

// The @Field() decorator accepts an optional type function (e.g., type => Int), and optionally an options object
// The options object can have any of the following key/value pairs:

// nullable: for specifying whether a field is nullable (in SDL, each field is non-nullable by default); boolean
// description: for setting a field description; string
// deprecationReason: for marking a field as deprecated; string

@ObjectType('UserSearchOutput')
export class UserSearchOutputModel {
  @Field((type) => [UserModel], { description: 'Users' })
  users: UserModel[];
  @Field({ description: 'Has more users?' })
  hasMore: boolean;
}

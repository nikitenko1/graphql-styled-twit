import { Field, ObjectType } from '@nestjs/graphql';

// The @Field() decorator accepts an optional type function (e.g., type => Int), and optionally an options object
// The options object can have any of the following key/value pairs:

// nullable: for specifying whether a field is nullable (in SDL, each field is non-nullable by default); boolean
// description: for setting a field description; string
// deprecationReason: for marking a field as deprecated; string

@ObjectType({ description: 'Profile' })
export class ProfileModel {
  @Field({ description: 'Username' })
  username: string;
  @Field({ nullable: true, description: 'Description' })
  description?: string;
  @Field({ nullable: true, description: 'Website' })
  website?: string;
  @Field({ description: 'Birthday' })
  birthday: string;
  @Field({ nullable: true, description: 'Avatar' })
  avatar?: string;
  @Field({ nullable: true, description: 'Profile background' })
  profileBackground?: string;
}

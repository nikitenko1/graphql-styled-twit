import { Field, ObjectType } from '@nestjs/graphql';

// The @Field() decorator accepts an optional type function (e.g., type => Int), and optionally an options object
// The options object can have any of the following key/value pairs:

// nullable: for specifying whether a field is nullable (in SDL, each field is non-nullable by default); boolean
// description: for setting a field description; string
// deprecationReason: for marking a field as deprecated; string

@ObjectType({ description: 'Auth' }) // for schema generation
export class LoginModel {
  @Field({ description: 'Username' })
  username: string;
  @Field({ description: 'Email' })
  email: string;
  @Field({ description: 'Pseudonym' })
  pseudonym: string;
  @Field({ description: 'Date of joining' })
  dateOfJoining: string;
  @Field({ description: 'Description', nullable: true })
  description?: string;
  @Field({ description: 'Birthday' })
  birthday: string;
  @Field({ description: 'Avatar', nullable: true })
  avatar?: string;
  @Field({ description: 'Profile background', nullable: true })
  profileBackground?: string;
  @Field({ description: 'Website', nullable: true })
  website?: string;
  @Field((type) => [String], { description: 'Bookmarks' })
  bookmarks: string[];
  @Field((type) => [String], { description: 'Likes' })
  likes: string[];
  @Field({ description: 'Access token' })
  accessToken: string;
  @Field({ description: 'Font size level', nullable: true })
  fontSizeLevel?: string;
  @Field({ description: 'Main color', nullable: true })
  color?: string;
  @Field({ description: 'App theme', nullable: true })
  theme?: string;
}

import { Field, ObjectType } from '@nestjs/graphql';

// The @Field() decorator accepts an optional type function (e.g., type => Int), and optionally an options object
// The options object can have any of the following key/value pairs:

// nullable: for specifying whether a field is nullable (in SDL, each field is non-nullable by default); boolean
// description: for setting a field description; string
// deprecationReason: for marking a field as deprecated; string

@ObjectType('User')
export class UserModel {
  @Field({ description: 'Username' })
  username: string;
  @Field({ description: 'Pseudonym' })
  pseudonym: string;
  @Field({ description: 'Date of joining' })
  dateOfJoining: string;
  @Field({ description: 'Description', nullable: true })
  description?: string;
  @Field({ description: 'Website', nullable: true })
  website?: string;
  @Field({ description: 'Avatar', nullable: true })
  avatar?: string;
  @Field({
    description: 'Profile background',
    defaultValue:
      'https://res.cloudinary.com/dvpy1nsjp/image/upload/v1699441341/backrgound-twitter.jpg',
  })
  profileBackground?: string;
}

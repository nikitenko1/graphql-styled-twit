import { Field, ID, ObjectType } from '@nestjs/graphql';

// The @Field() decorator accepts an optional type function (e.g., type => Int), and optionally an options object
// The options object can have any of the following key/value pairs:

// nullable: for specifying whether a field is nullable (in SDL, each field is non-nullable by default); boolean
// description: for setting a field description; string
// deprecationReason: for marking a field as deprecated; string

@ObjectType('Comments')
export class CommentsModel {
  @Field((type) => ID, { description: 'Tweet id' })
  id: string;
  @Field((type) => ID, { description: 'User reference' })
  userRef: string;
  @Field((type) => ID, { description: 'Tweet reference' })
  tweetRef: string;
  @Field({ description: 'Tweet text', nullable: true })
  text?: string;
  @Field((type) => [String], { description: 'Tweet media', nullable: true })
  media?: string[];
  @Field((type) => String, { description: 'Tweet gif', nullable: true })
  gif?: string;
  @Field((type) => String, { description: 'Date when tweet created' })
  createdAt: string;
}

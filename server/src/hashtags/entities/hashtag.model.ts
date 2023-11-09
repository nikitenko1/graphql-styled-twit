import { Field, ObjectType } from '@nestjs/graphql';

// The @Field() decorator accepts an optional type function (e.g., type => Int), and optionally an options object
// The options object can have any of the following key/value pairs:

// nullable: for specifying whether a field is nullable (in SDL, each field is non-nullable by default); boolean
// description: for setting a field description; string
// deprecationReason: for marking a field as deprecated; string
@ObjectType('HashtagModel')
export class HashtagModel {
  @Field({ description: 'Hashtag name' })
  hashtag: string;
  @Field({ description: 'Number of tweets with this hashtag' })
  numberOfTweets: number;
  @Field((type) => [String], {
    description: 'Tweets with this hashtag',

    defaultValue: [],
  })
  tweets: string[];
}

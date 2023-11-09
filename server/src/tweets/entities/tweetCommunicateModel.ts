import { Field, ObjectType } from '@nestjs/graphql';

// The @Field() decorator accepts an optional type function (e.g., type => Int), and optionally an options object
// The options object can have any of the following key/value pairs:

// nullable: for specifying whether a field is nullable (in SDL, each field is non-nullable by default); boolean
// description: for setting a field description; string
// deprecationReason: for marking a field as deprecated; string

@ObjectType('TweetCommunication') // for schema generation
export class TweetCommunicateModel {
  @Field({ description: 'Likes' })
  likes: number;
  @Field({ description: 'Is user liked' })
  isUserLiked: boolean;
  @Field({ description: 'Comments' })
  comments: number;
  @Field({ description: 'Retweets' })
  retweets: number;
  @Field({ description: 'Is user retweeted' })
  isUserRetweeted: boolean;
  @Field({ description: 'Is user added tweet to bookmarks.ts' })
  isTweetBookmarked: boolean;
}

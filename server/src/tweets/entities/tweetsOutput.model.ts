import { Field, ObjectType } from '@nestjs/graphql';
import { TweetModel } from './tweet.model';

// The @Field() decorator accepts an optional type function (e.g., type => Int), and optionally an options object
// The options object can have any of the following key/value pairs:

// nullable: for specifying whether a field is nullable (in SDL, each field is non-nullable by default); boolean
// description: for setting a field description; string
// deprecationReason: for marking a field as deprecated; string

@ObjectType({ description: 'TweetOutput' }) // for schema generation
export class TweetsOutputModel {
  @Field((type) => [TweetModel], { description: 'Tweets' })
  tweets: TweetModel[];
  @Field({ description: 'Has more tweets?' })
  hasMore: boolean;
}

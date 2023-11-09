import { Field, InputType } from '@nestjs/graphql';

// If the mutation needs to take an object as an argument, we can create an input type.
// To declare an input type, use the @InputType() decorator.
@InputType('HomeTweets')
export class TweetsHomeInputType {
  @Field({ description: 'Tweets limit' })
  limit: number;
  @Field({ description: 'Type of search' })
  typeOfSearch: 'latest' | 'top';
  @Field({ description: 'Initial limit' })
  initialLimit: number;
}

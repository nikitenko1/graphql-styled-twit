import { Field, InputType } from '@nestjs/graphql';

// If the mutation needs to take an object as an argument, we can create an input type.
// To declare an input type, use the @InputType() decorator.
@InputType('TweetSearch')
export class TweetSearchInputType {
  @Field({ description: 'Search request' })
  searchRequest: string;
  @Field({ description: 'Tweets limit' })
  limit: number;
  @Field({ description: 'Initial limit' })
  initialLimit: number;
}

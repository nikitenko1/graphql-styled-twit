import { Field, InputType } from '@nestjs/graphql';

// If the mutation needs to take an object as an argument, we can create an input type.
// To declare an input type, use the @InputType() decorator.
@InputType({ description: 'Follow and unfollow data' })
export class FollowInputType {
  @Field({ description: 'Pseudonym' })
  pseudonym: string;
  @Field({ description: 'Is user following' })
  isUserFollowing: boolean;
}

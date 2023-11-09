import { Field, ID, InputType } from '@nestjs/graphql';

// If the mutation needs to take an object as an argument, we can create an input type.
// To declare an input type, use the @InputType() decorator.
@InputType('CommentsInput')
export class CommentsInputType {
  @Field((type) => ID, { description: 'Comment reference' })
  tweetRef: string;
  @Field({ description: 'Comment text', nullable: true })
  text?: string;
  @Field((type) => [String], { description: 'Comment media', nullable: true })
  media?: string[];
  @Field((type) => String, { description: 'Comment gif', nullable: true })
  gif?: string;
  @Field({ description: 'Date when comment created' })
  createdAt: string;
}

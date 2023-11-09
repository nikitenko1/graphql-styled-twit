import { Field, InputType } from '@nestjs/graphql';

// If the mutation needs to take an object as an argument, we can create an input type.
// To declare an input type, use the @InputType() decorator.
@InputType('Tweet', { description: 'Tweet input' })
export class TweetInputType {
  @Field({ description: 'Tweet text', nullable: true })
  text?: string;
  @Field((type) => [String], { description: 'Tweet media', nullable: true })
  media?: string[];
  @Field((type) => String, { description: 'Tweet gif', nullable: true })
  gif?: string;
  @Field({ description: 'Date when tweet created' })
  createdAt: string;
}

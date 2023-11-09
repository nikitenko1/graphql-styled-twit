import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';

// If the mutation needs to take an object as an argument, we can create an input type.
// To declare an input type, use the @InputType() decorator.
@InputType({ description: 'profile' })
export class ProfileInputType {
  @IsString()
  @MinLength(4, {
    message: 'Username must be at least 4 characters long',
  })
  @MaxLength(16, {
    message: 'Maximum length of username - 16',
  })
  @Field({ description: 'Username' })
  username: string;
  @Field({ nullable: true, description: 'Description' })
  description?: string;
  @Field({ description: 'Website', nullable: true })
  website?: string;
  @Field({ description: 'Birthday' })
  birthday: string;
  @Field({ nullable: true, description: 'Avatar' })
  avatar?: string;
  @Field({ nullable: true, description: 'Profile background' })
  profileBackground?: string;
}

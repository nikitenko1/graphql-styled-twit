import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, Min, Max } from 'class-validator';

// If the mutation needs to take an object as an argument, we can create an input type.
// To declare an input type, use the @InputType() decorator.
@InputType()
export class PasswordResetCodeModel {
  @Field({ description: 'User email' })
  userEmail: string;

  @IsNumber()
  @Min(100000, { message: 'Code must be 6 characters long' })
  @Max(999999, { message: 'Code must be 6 characters long' })
  @Field({ description: 'Verification code' })
  code: number;
}

import { Field, InputType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

// If the mutation needs to take an object as an argument, we can create an input type.
// To declare an input type, use the @InputType() decorator.
@InputType('LoginDataModel')
export class LoginInputModel {
  @IsString()
  @Length(1, 100, {
    message: 'Minimum number of characters - 1, maximum - 100',
  })
  @Field({ description: 'Email or username' })
  emailOrUsername: string;
  @IsString()
  @Length(4, 50, { message: 'Minimum number of characters - 4, maximum - 50' })
  @Field({ description: 'Password' })
  password: string;
}

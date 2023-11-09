import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, Max, Min } from 'class-validator';
import { UserModel } from './user.model';

// The @Field() decorator accepts an optional type function (e.g., type => Int), and optionally an options object
// The options object can have any of the following key/value pairs:

// nullable: for specifying whether a field is nullable (in SDL, each field is non-nullable by default); boolean
// description: for setting a field description; string
// deprecationReason: for marking a field as deprecated; string

@ObjectType({ description: 'Verification data' }) // for schema generation
@InputType()
export class VerificationModel {
  @Field({ description: 'User data' })
  user: UserModel;

  @IsNumber()
  @Min(100000, { message: 'Code must be 6 characters long' })
  @Max(999999, { message: 'Code must be 6 characters long' })
  @Field({ description: 'Verification code' })
  code: number;
}

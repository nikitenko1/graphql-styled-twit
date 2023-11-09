import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

// The @Field() decorator accepts an optional type function (e.g., type => Int), and optionally an options object
// The options object can have any of the following key/value pairs:

// nullable: for specifying whether a field is nullable (in SDL, each field is non-nullable by default); boolean
// description: for setting a field description; string
// deprecationReason: for marking a field as deprecated; string

@ObjectType({ description: 'Auth' }) // for schema generation
@InputType('UserInput')
export class UserModel {
  @IsString()
  @MinLength(4, {
    message: 'Username must be at least 4 characters long',
  })
  @MaxLength(16, {
    message: 'Maximum length of username - 16',
  })
  @Field({ description: 'Username' })
  username: string;

  @IsString()
  @MinLength(4, {
    message: 'Pseudonym must be at least 4 characters long',
  })
  @MaxLength(16, {
    message: 'Maximum length of pseudonym - 16',
  })
  @Matches(/^[a-zA-Z\d-_]+$/, {
    message:
      'Pseudonym can contain only numbers, and latin letters and -, _ symbols',
  })
  @Field({ description: 'Pseudonym' })
  pseudonym: string;

  @IsEmail(undefined, {
    message: 'Please make sure you entered the correct email',
  })
  @Field({ description: 'Email' })
  email: string;

  @IsString()
  @MinLength(4, {
    message: 'Password must be longer than or equal to 4 characters ',
  })
  @MaxLength(25, {
    message: 'Password must be shorter than or equal to 25 characters',
  })
  @Field({ description: 'Password' })
  password: string;

  @Field({ description: 'Date of joining', nullable: true })
  dateOfJoining?: string;

  @IsString()
  @MinLength(1, { message: 'Enter your birthday' })
  @Field({ description: 'Birthday' })
  birthday: string;
}

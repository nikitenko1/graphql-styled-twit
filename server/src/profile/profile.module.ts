import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import UserSchema from 'src/auth/schemas/auth.schema';
import { MongooseModule } from '@nestjs/mongoose';
import TokenSchema from 'src/tokens/schemas/token.schema';
import { FilesModule } from 'src/files/files.module';
import { FilesService } from 'src/files/files.service';
import { TokensService } from 'src/tokens/tokens.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
      { name: 'Token', schema: TokenSchema },
    ]),
    FilesModule,
  ],
  providers: [ProfileResolver, ProfileService, FilesService, TokensService],
})
export class ProfileModule {}

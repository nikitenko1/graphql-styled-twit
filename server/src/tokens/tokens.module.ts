import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { MongooseModule } from '@nestjs/mongoose';
import TokenSchema from './schemas/token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }]),
  ],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}

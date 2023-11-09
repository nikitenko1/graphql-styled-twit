import { Module } from '@nestjs/common';
import { RetweetsService } from './retweets.service';
import { RetweetsResolver } from './retweets.resolver';
import TokenSchema from 'src/tokens/schemas/token.schema';
import { TokensService } from 'src/tokens/tokens.service';
import { MongooseModule } from '@nestjs/mongoose';
import RetweetsSchema from './schemas/retweets.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Retweets',
        schema: RetweetsSchema,
      },
      {
        name: 'Token',
        schema: TokenSchema,
      },
    ]),
  ],
  providers: [RetweetsService, RetweetsResolver, TokensService],
  exports: [RetweetsService],
})
export class RetweetsModule {}

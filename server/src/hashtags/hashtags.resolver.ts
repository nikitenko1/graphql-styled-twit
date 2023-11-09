import { Query, Resolver } from '@nestjs/graphql';
import { HashtagsService } from './hashtags.service';
import { HashtagModel } from './entities/hashtag.model';

@Resolver()
export class HashtagsResolver {
  constructor(private hashtagService: HashtagsService) {}

  @Query((returns) => [HashtagModel])
  async getRandomHashtags() {
    return await this.hashtagService.getRandomHashtags();
  }
}

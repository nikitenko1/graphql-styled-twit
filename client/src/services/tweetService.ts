import { MutationFunction } from "@apollo/client";

class TweetService {
  async createTweet(
    createTweet: MutationFunction,
    data: { text: string; media?: string[]; gif?: string }
  ) {
    const response = await createTweet({
      variables: {
        variable: {
          text: data.text,
          media: data.media,
          gif: data.gif,
          createdAt: new Date().toString(),
        },
      },
    });

    return response.data;
  }
}

export default new TweetService();

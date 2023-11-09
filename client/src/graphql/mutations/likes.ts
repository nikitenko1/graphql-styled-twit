import { gql } from "@apollo/client";

export const LIKE_TWEET = gql`
  mutation likeTweet($variable: String!) {
    likeTweet(tweetRef: $variable)
  }
`;

import { gql } from "@apollo/client";

export const RETWEET = gql`
  mutation retweet($variable: ID!) {
    retweet(tweetId: $variable)
  }
`;

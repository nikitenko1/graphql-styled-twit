import { gql } from "@apollo/client";

export const CREATE_TWEET = gql`
  mutation createTweet($variable: Tweet!) {
    createTweet(tweetData: $variable) {
      text
    }
  }
`;

export const DELETE_TWEET = gql`
  mutation deleteTweet($variable: String!) {
    deleteTweet(tweetId: $variable)
  }
`;

import { gql } from "@apollo/client";

export const GET_RECOMMENDED_USERS = gql`
  query getRecommendedUsers {
    getRecommendedUsers {
      avatar
      pseudonym
      username
    }
  }
`;

export const SEARCH_FOR_RESULTS = gql`
  query searchForResults($variable: String!) {
    searchForResults(searchRequest: $variable) {
      hashtags {
        hashtag
        numberOfTweets
      }
      users {
        pseudonym
        avatar
        username
      }
    }
  }
`;

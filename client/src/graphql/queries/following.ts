import { gql } from "@apollo/client";

export const GET_FOllOWING_AND_FOLLOWERS_AMOUNT = gql`
  query getFollowingData($variable: String!) {
    getFollowingData(pseudonym: $variable) {
      followingAmount
      followersAmount
      isUserFollowing
    }
  }
`;

export const GET_FOLLOWING = gql`
  query getFollowing($variable: String!) {
    getFollowing(pseudonym: $variable) {
      avatar
      username
      pseudonym
      description
      isFollowing
    }
  }
`;

export const GET_FOLLOWERS = gql`
  query getFollowers($variable: String!) {
    getFollowers(pseudonym: $variable) {
      avatar
      username
      pseudonym
      description
      isFollowing
    }
  }
`;

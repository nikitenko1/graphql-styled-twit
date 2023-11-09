import { gql } from "@apollo/client";

export const FOLLOW = gql`
  mutation follow($variable: FollowInputType!) {
    follow(followData: $variable)
  }
`;

export const UNFOLLOW = gql`
  mutation unfollow($variable: String!) {
    unfollow(pseudonym: $variable)
  }
`;

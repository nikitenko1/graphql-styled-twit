import { gql } from "@apollo/client";

export const GET_SEARCHED_USERS = gql`
  query getSearchedUsers($variable: UserSearch!) {
    getSearchedUsers(usersSearch: $variable) {
      users {
        username
        pseudonym
        avatar
      }
      hasMore
    }
  }
`;

export const GET_USER = gql`
  query getUser($variable: String!) {
    getUser(pseudonym: $variable) {
      username
      pseudonym
      dateOfJoining
      description
      website
      avatar
      profileBackground
    }
  }
`;

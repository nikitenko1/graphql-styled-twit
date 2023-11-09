import { gql } from "@apollo/client";

export const ADD_BOOKMARK = gql`
  mutation addBookmark($variable: ID!) {
    addBookmark(tweetId: $variable)
  }
`;

export const CLEAR_ALL_BOOKMARKS = gql`
  mutation {
    clearAllBookmarks
  }
`;

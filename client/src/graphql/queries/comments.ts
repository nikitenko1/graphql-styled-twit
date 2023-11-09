import { gql } from "@apollo/client";

export const GET_ALL_COMMENTS = gql`
  query getAllComments($variable: commentFetch!) {
    getAllComments(commentData: $variable) {
      hasMore
      comments {
        id
        userRef
        text
        media
        gif
        createdAt
        tweetRef
      }
    }
  }
`;

export const GET_COMMENT_BY_ID = gql`
  query getCommentById($variable: String!) {
    getCommentById(commentId: $variable) {
      id
      userRef
      text
      media
      gif
      createdAt
    }
  }
`;

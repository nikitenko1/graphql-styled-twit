import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation createComment($variable: CommentsInputType!) {
    createComment(commentData: $variable)
  }
`;

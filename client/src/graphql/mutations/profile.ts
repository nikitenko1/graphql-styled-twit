import { gql } from "@apollo/client";

export const SAVE_CHANGES = gql`
  mutation saveChanges($variable: ProfileInputType!) {
    saveChanges(profile: $variable) {
      username
      website
      description
      avatar
      profileBackground
      birthday
    }
  }
`;

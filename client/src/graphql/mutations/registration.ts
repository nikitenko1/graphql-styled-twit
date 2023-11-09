import { gql } from "@apollo/client";

export const CHECK_REGISTER_DATA = gql`
  mutation checkRegisterData($variable: UserInput!) {
    checkRegisterData(user: $variable) {
      email
    }
  }
`;

export const CHECK_VERIFICATION_CODE = gql`
  mutation checkVerificationCode($variable: VerificationModel!) {
    checkVerificationCode(verification: $variable) {
      username
      email
      pseudonym
      dateOfJoining
      birthday
      bookmarks
      likes
      avatar
      accessToken
      profileBackground
      website
      description
      fontSizeLevel
      color
      theme
    }
  }
`;

export const RESEND_VERIFICATION_CODE = gql`
  mutation sendVerificationCode($variable: String!) {
    sendVerificationCode(email: $variable)
  }
`;

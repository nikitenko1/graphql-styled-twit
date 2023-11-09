import { gql } from "@apollo/client";

export const CHECK_LOGIN_DATA = gql`
  mutation checkLoginData($variable: String!) {
    checkLoginData(user: $variable)
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($variable: passwordResetData!) {
    resetPassword(newPasswordData: $variable)
  }
`;

export const LOGIN = gql`
  mutation login($variable: LoginDataModel!) {
    login(loginInput: $variable) {
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

export const LOGOUT = gql`
  mutation {
    logout
  }
`;

export const CHECK_PASSWORD_RESET_CODE = gql`
  mutation checkPasswordResetCode($variable: PasswordResetCodeModel!) {
    checkPasswordResetCode(verification: $variable)
  }
`;

export const UNAUTHORIZED_LOGOUT = `
mutation{
logout
}
`;

import { gql } from "@apollo/client";

export const SET_FONT_SIZE = gql`
  mutation setFontSize($variable: String!) {
    setFontSize(fontSize: $variable)
  }
`;

export const SET_THEME = gql`
  mutation setTheme($variable: String!) {
    setTheme(theme: $variable)
  }
`;

export const SET_COLOR = gql`
  mutation setColor($variable: String!) {
    setColor(color: $variable)
  }
`;

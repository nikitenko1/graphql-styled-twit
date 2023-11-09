import styled from "styled-components";
import ITypography from "../../../types/interfaces/ITypography";

const StyledParagraph = styled.p<{ fontSize?: string }>`
  font-size: ${({ theme, fontSize }) => (fontSize ? fontSize : theme.fontSizes.paragraph)};
  font-weight: 400;
`;

export interface IProps extends ITypography {
  fontSize?: string;
}

const Paragraph = ({ children, className, fontSize }: IProps) => {
  return (
    <StyledParagraph fontSize={fontSize} className={className}>
      {children}
    </StyledParagraph>
  );
};

export default Paragraph;

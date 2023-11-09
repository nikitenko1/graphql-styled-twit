import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledAlert = styled.div`
  position: fixed;
  z-index: 2000;
  word-break: break-word;
  color: ${({ theme }) => theme.colors.white};
  top: 50px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.danger_red};
`;

interface IProps {
  text: string;
  interval: number;
}

const Alert = ({ text, interval }: IProps) => {
  const [isVisible, setVisibility] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisibility(false);
    }, interval);
  }, []);

  if (!isVisible) return null;

  if (text === "Auth error") return null;

  return (
    <StyledAlert>{text ? text : "An unknown error has occurred. Please try again"}</StyledAlert>
  );
};

export default Alert;

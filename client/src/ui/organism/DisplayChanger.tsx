import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import BackgroundPicker from "../atoms/BackgroundPicker";
import Button from "../atoms/Button";
import ColorPicker from "../atoms/ColorPicker";
import H3Title from "../atoms/Typography/H3Title";
import H6Title from "../atoms/Typography/H6Title";
import Paragraph from "../atoms/Typography/Paragraph";
import SliderWithSteps from "../atoms/SliderWithSteps";
import PopUp from "../molecules/PopUp";
import Tweet from "./Tweet";
import UserStore from "../../store/UserStore";
import DisplayService from "../../services/displayService";
import ThemeStore from "../../store/ThemeStore";
import ColorsEnum from "../../types/enums/ColorsEnum";
import useDelayedRequest from "../../hooks/useDelayedRequest";
import { SET_COLOR, SET_FONT_SIZE, SET_THEME } from "../../graphql/mutations/display";

const StyledDisplayChanger = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 5px;

  .centered {
    text-align: center;
  }
`;

const DemoTweet = styled(Tweet)`
  border: 2px solid ${({ theme }) => theme.colors.gray_thin};
  border-radius: 20px;
  pointer-events: none;

  .tweetCommunication {
    display: none;
  }
`;

const SmallH6Title = styled(H6Title)`
  font-size: 0.9rem;
  color: #677682;
`;

const ItemWrapper = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.gray_thin};
  border-radius: 10px;
  padding: 10px 40px;
`;

const SliderWrapper = styled(ItemWrapper)`
  padding: 0 40px;

  &:before {
    content: "Aa";
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 0.9rem;
  }

  &:after {
    content: "Aa";
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 1.5rem;
  }
`;

const DoneButton = styled(Button)`
  align-self: center;
  margin-top: 20px;
`;

interface IProps {
  closeDisplayChanger: () => void;
}

const DisplayChanger = observer(({ closeDisplayChanger }: IProps) => {
  const [setFontSize] = useMutation(SET_FONT_SIZE);
  const [setColor] = useMutation(SET_COLOR);
  const [setTheme] = useMutation(SET_THEME);
  const [pickedColor, setPickedColor] = useState<ColorsEnum>(ThemeStore.mainColor);
  const [pickedBackgroundColor, setPickedBackgroundColor] = useState(
    ThemeStore.theme.backgroundColor
  );

  useEffect(() => {
    DisplayService.handleFontSizeChange(UserStore.fontSizeLevel);
  }, [UserStore.fontSizeLevel]);

  useEffect(() => {
    DisplayService.handleBackgroundColorChange(pickedBackgroundColor);
  }, [pickedBackgroundColor]);

  useEffect(() => {
    DisplayService.handleColorChange(pickedColor);
  }, [pickedColor]);

  useDelayedRequest([UserStore.fontSizeLevel], () =>
    setFontSize({
      variables: { variable: UserStore.fontSizeLevel },
    })
  );

  useDelayedRequest([pickedColor], () =>
    setColor({
      variables: { variable: pickedColor },
    })
  );

  useDelayedRequest([pickedBackgroundColor], () =>
    setTheme({
      variables: { variable: pickedBackgroundColor },
    })
  );

  return (
    <PopUp closePopUp={closeDisplayChanger}>
      <StyledDisplayChanger>
        <H3Title className="centered">Customize your view</H3Title>
        <Paragraph className="centered">
          These settings affect all the Twitter accounts on this browser.
        </Paragraph>
        <DemoTweet
          userRef="Tandrevolt"
          text="At the heart of Twitter are short messages called Tweets — just like this one — which can include photos, videos, links, text, hashtags, and mentions like @Tandrevolt"
          media={[
            "https://res.cloudinary.com/dvpy1nsjp/image/upload/v1696055913/ua-you/a2ed4c7bd4c28131fb989c82f2c0cc6b.jpg",
          ]}
          gif={undefined}
          createdAt={new Date().toString()}
          id={"id"}
        />
        <SmallH6Title>Font size</SmallH6Title>
        <SliderWrapper>
          <SliderWithSteps
            maxSteps={"5"}
            currentStep={UserStore.fontSizeLevel}
            onStepChange={(step) => UserStore.setFontSizeLevel(step)}
          />
        </SliderWrapper>
        <SmallH6Title>Color</SmallH6Title>
        <ItemWrapper>
          <ColorPicker pickedColor={pickedColor} onColorChange={(color) => setPickedColor(color)} />
        </ItemWrapper>
        <SmallH6Title>Background</SmallH6Title>
        <ItemWrapper>
          <BackgroundPicker
            setColor={(color) => setPickedBackgroundColor(color)}
            pickedColor={pickedBackgroundColor}
          />
        </ItemWrapper>
        <DoneButton small onClick={() => closeDisplayChanger()}>
          Done
        </DoneButton>
      </StyledDisplayChanger>
    </PopUp>
  );
});

export default DisplayChanger;

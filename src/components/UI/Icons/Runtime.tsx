import { useContext } from "react";
import { ModeContext } from "../../../context/mode";
import { ModeType } from "../../../types/mode";
import styled, {css} from "styled-components";
import spritePath from "../../../assets/svg/sprite.svg";

interface StyledIconProps {
  mode: ModeType;
}

export const Runtime = () => {
  const modeContext = useContext(ModeContext);

  return (
    <StyledSvg mode={modeContext!.mode}>
      <use xlinkHref={`${spritePath}#icon-eye`}></use>
    </StyledSvg>
  );
};

const StyledSvg = styled.svg<StyledIconProps>`
  display: block;
  border: none;

  width: 2rem;
  height: 2rem;

  stroke: #4d5562;
  stroke-width: 2;

  ${({mode}) => mode === ModeType.RUNTIME && ActiveIcon}
`
const ActiveIcon = css`
  stroke: #5d5fef;
`
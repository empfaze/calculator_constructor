import { useContext } from "react";
import { ModeContext } from "../../../context/mode";
import { ModeType } from "../../../types/mode";
import styled, {css} from "styled-components";
import spritePath from "../../../assets/svg/sprite.svg";

interface StyledIconProps {
  mode: ModeType;
}

export const Constructor = () => {
  const modeContext = useContext(ModeContext);

  return (
    <StyledSvg mode={modeContext!.mode}>
      <use xlinkHref={`${spritePath}#icon-brackets`}></use>
    </StyledSvg>
  );
};

const StyledSvg = styled.svg<StyledIconProps>`
  display: block;
  border: none;

  width: 1.4rem;
  height: 1rem;

  stroke: #4d5562;
  stroke-width: 2;

  ${({mode}) => mode === ModeType.CONSTRUCTOR && ActiveIcon}
`

const ActiveIcon = css`
  stroke: #5d5fef;
`
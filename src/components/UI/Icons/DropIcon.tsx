import styled from "styled-components";
import spritePath from "../../../assets/svg/sprite.svg";

export const DropIcon = () => {
  return (
      <StyledSvg>
        <use xlinkHref={`${spritePath}#icon-drop`}></use>
      </StyledSvg>
  );
};

const StyledSvg = styled.svg`
  display: block;
  border: none;
  width: 2.2rem;
  height: 2.2rem;

  margin-bottom: 0.5rem;
`
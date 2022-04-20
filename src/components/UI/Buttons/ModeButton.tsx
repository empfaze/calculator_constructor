import { FC, KeyboardEvent, useContext } from "react";
import { ModeContext } from "../../../context/mode";
import { ModeType } from "../../../types/mode";
import { Constructor } from "../Icons/Constructor";
import { Runtime } from "../Icons/Runtime";
import styled, { css } from "styled-components";

interface ModeButtonProps {
  type: ModeType;
}

interface StyledModeButtonProps {
  type: ModeType;
  mode?: ModeType;
}

export const ModeButton: FC<ModeButtonProps> = ({ type }) => {
  const modeContext = useContext(ModeContext);

  function clickHandler(): void {
    if (type === modeContext?.mode) return;

    modeContext?.setMode(type);
  }
  function keyDownHandler(e: KeyboardEvent<HTMLDivElement>): void {
    if (e.key !== "Enter" || type === modeContext?.mode) return;

    modeContext?.setMode(type);
  }

  const inputID = `${type.toLowerCase()}`;
  const ariaLabel = `${type.toLowerCase()} mode`;
  const defaultChecked = modeContext?.mode === type;

  const buttonTitle = `${type[0]}${type.slice(1).toLowerCase()}`;

  return (
    <Wrapper type={type}>
      <StyledInput type="radio" id={inputID} aria-label={ariaLabel} defaultChecked={defaultChecked}/>
      <StyledContentBody tabIndex={0} onClick={clickHandler} onKeyDown={keyDownHandler} type={type} mode={modeContext!.mode}>
        {type === ModeType.RUNTIME && <Runtime />}
        {type === ModeType.CONSTRUCTOR && <Constructor />}
        <StyledTitle>{buttonTitle}</StyledTitle>
      </StyledContentBody>
    </Wrapper>
  );
};

const Wrapper = styled.div<StyledModeButtonProps>`
  height: 3.6rem;
  position: relative;
  width: ${({type}) => {
    switch (type) {
      case ModeType.RUNTIME:
        return "10.8rem";
      case ModeType.CONSTRUCTOR:
        return "13.3rem";
    }
  }}
`

const StyledInput = styled.input`
  opacity: 0;
  visibility: hidden;

  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`

const StyledTitle = styled.span`
  font-size: 1.4rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: #4d5562;

  margin-left: 0.8rem;
`

const StyledContentBody = styled.div<StyledModeButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid transparent;
  background-color: transparent;
  cursor: pointer;

  transition: all 0.1s ease-in;

  ${({type, mode}) => mode === type && ActiveButton}
`

const ActiveButton = css`
  border: 1px solid #e2e3e5;
  background-color: #ffffff;
  cursor: default;
`
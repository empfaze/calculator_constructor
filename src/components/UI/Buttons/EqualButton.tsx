import {FC, KeyboardEvent, MouseEvent} from "react";
import {BlockStatus, IBlock} from "../../../types/calculator";
import styled from "styled-components";
import {selectOperand, selectSecondNumber} from "../../../auxiliary/selectors";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useTypedActions} from "../../../hooks/useTypedActions";

interface ButtonProps {
  equalButton: IBlock;
}

interface StyledEqualButtonProps {
  equalButton: IBlock;
}

export const EqualButton: FC<ButtonProps> = ({ equalButton }) => {
  const operand = useTypedSelector(selectOperand);
  const secondNumber = useTypedSelector(selectSecondNumber);

  const {countValue} = useTypedActions();

  function mouseDownHandler(e: MouseEvent<HTMLButtonElement>) {
    if (e.button !== 0 || equalButton.status === BlockStatus.NOT_ACTIVE || !operand || !secondNumber) return;
    countValue();
  }

  function keyDownHandler(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key !== "Enter" || equalButton.status === BlockStatus.NOT_ACTIVE || !operand || !secondNumber) return;
    countValue();
  }

  const tabIndex = equalButton.status === BlockStatus.ACTIVE ? 0 : -1;

  return (
    <StyledButton tabIndex={tabIndex} onMouseDown={mouseDownHandler} onKeyDown={keyDownHandler} equalButton={equalButton}>=</StyledButton>
  )
}

const StyledButton = styled.button<StyledEqualButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;

  font-family: inherit;
  border-radius: 6px;
  background-color: #5d5fef;
  border: none;
  color: #ffffff;
  font-size: 1.4rem;
  line-height: 1.5rem;
  
  opacity: ${({equalButton}) => {
      switch (equalButton.status) {
        case BlockStatus.NOT_ACTIVE:
            return 0.5;
        default:
            return 1;
      }
  }};
  cursor: ${({equalButton}) => {
    switch (equalButton.status) {
      case BlockStatus.DRAG:
        return "move";
      case BlockStatus.NOT_ACTIVE:
        return "default";
      case BlockStatus.ACTIVE:
        return "pointer";  
      default:
        return "pointer";
    }
  }};
`
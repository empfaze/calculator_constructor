import { FC, KeyboardEvent, MouseEvent } from "react";
import { BlockStatus } from "../../../types/calculator";
import {NumberButtonValue, ResultNumberType} from "../../../types/result";
import {selectFirstNumber, selectOperand, selectSecondNumber} from "../../../auxiliary/selectors";
import styled from "styled-components";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useTypedActions} from "../../../hooks/useTypedActions";

interface ButtonProps {
  value: string;
  status: BlockStatus;
}

interface StyledButtonProps {
  status: BlockStatus;
}

export const NumberButton: FC<ButtonProps> = ({ value, status }) => {
  const firstNumber = useTypedSelector(selectFirstNumber);
  const operand = useTypedSelector(selectOperand);
  const secondNumber = useTypedSelector(selectSecondNumber);

  const {addDataToNumber, resetResultData} = useTypedActions();

  function mouseDownHandler(e: MouseEvent<HTMLButtonElement>) {
    if (e.button === 0) {
      if (status === BlockStatus.ACTIVE) {
        if (value === NumberButtonValue.DEL) {
          resetResultData();
          return;
        }

        if (!operand && firstNumber?.length !== 8) addDataToNumber({ value, numberType: ResultNumberType.FIRST_NUMBER });
        else if (operand && secondNumber?.length !== 8) addDataToNumber({ value, numberType: ResultNumberType.SECOND_NUMBER });
      }
    }
  }
  function keyDownHandler(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Enter") {
      if (status === BlockStatus.ACTIVE) {
        if (value === NumberButtonValue.DEL) {
          resetResultData();
          return;
        }

        if (!operand && firstNumber?.length !== 8) addDataToNumber({ value, numberType: ResultNumberType.FIRST_NUMBER });
        else if (operand && secondNumber?.length !== 8) addDataToNumber({value, numberType: ResultNumberType.SECOND_NUMBER});
      }
    }
  }

  const tabIndex = status === BlockStatus.ACTIVE ? 0 : -1;

  return (
      <StyledButton status={status} tabIndex={tabIndex} onMouseDown={mouseDownHandler} onKeyDown={keyDownHandler}>
        {value}
      </StyledButton>
  );
};

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;
  border-radius: 6px;
  border: 1px solid #e2e3e5;

  font-family: inherit;
  font-size: 1.4rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: #000000;

  cursor: ${({status}) => {
    switch (status) {
      case BlockStatus.DRAG:
        return "move";
      case BlockStatus.NOT_ACTIVE:
        return "default";
      case BlockStatus.ACTIVE:
        return "pointer";
      default:
        return "move";
    }
  }};
  opacity: ${({status}) => {
    switch (status) {
      case BlockStatus.NOT_ACTIVE:
        return 0.5;
      default:
        return 1;
    }
  }};
  transition: ${({status}) => status === BlockStatus.ACTIVE ? "all 0.1s ease-in" : "none"};
  
  &:hover {
    border-color: ${({status}) => status === BlockStatus.ACTIVE && "#5d5fef"};
  }
`
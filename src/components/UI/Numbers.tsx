import { FC } from "react";
import {BlockDestination, BlockStatus, IBlock} from "../../types/calculator";
import { NumberButtonValue } from "../../types/result";
import { NumberButton } from "./Buttons/NumberButton";
import {ElementStrike} from "./Strike/ElementStrike";
import {useElementsDrag} from "../../hooks/useElementsDrag";
import {useElementsReturn} from "../../hooks/useElementsReturn";
import styled from "styled-components";

interface NumbersProps {
  numbers: IBlock;
}

interface StyledNumbersProps {
  numbers: IBlock;
}

export const Numbers: FC<NumbersProps> = ({ numbers }) => {
  const {isDraggable, dragLeaveHandler, dragStartHandler, dropHandler, dragOverHandler} = useElementsDrag(numbers);
  const {doubleClickHandler} = useElementsReturn(numbers)

  return (
    <StyledNumbersWrapper numbers={numbers} draggable={isDraggable} onDragStart={dragStartHandler} onDragOver={dragOverHandler} onDragLeave={dragLeaveHandler} onDrop={dropHandler} onDoubleClick={doubleClickHandler}>
      <StyledNumbers numbers={numbers}>
        <NumberButton status={numbers.status} value={NumberButtonValue.SEVEN} />
        <NumberButton status={numbers.status} value={NumberButtonValue.EIGHT} />
        <NumberButton status={numbers.status} value={NumberButtonValue.NINE} />
        <NumberButton status={numbers.status} value={NumberButtonValue.FOUR} />
        <NumberButton status={numbers.status} value={NumberButtonValue.FIVE} />
        <NumberButton status={numbers.status} value={NumberButtonValue.SIX} />
        <NumberButton status={numbers.status} value={NumberButtonValue.ONE} />
        <NumberButton status={numbers.status} value={NumberButtonValue.TWO} />
        <NumberButton status={numbers.status} value={NumberButtonValue.THREE} />
        <NumberButton status={numbers.status} value={NumberButtonValue.ZERO} />
        <NumberButton status={numbers.status} value={NumberButtonValue.DEL} />
        <NumberButton status={numbers.status} value={NumberButtonValue.COMMA} />
      </StyledNumbers>
      <ElementStrike element={numbers} />
    </StyledNumbersWrapper>
  );
};

const StyledNumbersWrapper = styled.div<StyledNumbersProps>`
  width: 100%;
  padding: 4px;
  border-radius: 6px;
  position: relative;

  cursor: ${({numbers}) => {
    switch (numbers.status) {
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
  opacity: ${({numbers}) => {
    switch (numbers.status) {
      case BlockStatus.NOT_ACTIVE:
        return 0.5;
      default:
        return 1;
    }
  }};
  box-shadow: ${({numbers}) => {
    switch (numbers.destination) {
      case BlockDestination.RESULT_COLUMN:
        return "none";
      case BlockDestination.INITIAL_COLUMN:
        return "0 2px 6px rgba(0,0,0,0.1)";
    }
  }};
`

const StyledNumbers = styled.div<StyledNumbersProps>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(5rem, 7.2rem));
  grid-template-rows: repeat(4, 4.8rem);
  grid-gap: 0.8rem;
  justify-items: stretch;
  align-items: stretch;

  cursor: ${({numbers}) => {
    switch (numbers.status) {
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
  opacity: ${({numbers}) => {
    switch (numbers.status) {
      case BlockStatus.NOT_ACTIVE:
        return 0.5;
      default:
        return 1;
    }
  }};
`
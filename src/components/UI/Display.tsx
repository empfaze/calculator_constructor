import { FC } from "react";
import {BlockDestination, BlockStatus, IBlock} from "../../types/calculator";
import {selectFirstNumber, selectOperand, selectSecondNumber} from "../../auxiliary/selectors";
import styled from "styled-components";
import {ElementStrike} from "./Strike/ElementStrike";
import {useElementsDrag} from "../../hooks/useElementsDrag";
import {useElementsReturn} from "../../hooks/useElementsReturn";
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface DisplayProps {
  display: IBlock;
}

interface StyledDisplayProps {
  display: IBlock;
}

export const Display: FC<DisplayProps> = ({ display }) => {
  const firstNumber = useTypedSelector(selectFirstNumber);
  const operand = useTypedSelector(selectOperand);
  const secondNumber = useTypedSelector(selectSecondNumber);

  const {isDraggable, dragLeaveHandler, dragStartHandler, dropHandler, dragOverHandler} = useElementsDrag(display);
  const {doubleClickHandler} = useElementsReturn(display);

  const displayNumber: string | null = (operand && secondNumber) ? secondNumber : firstNumber;

  return (
    <StyledDisplayWrapper display={display} draggable={isDraggable} onDragStart={dragStartHandler} onDragOver={dragOverHandler} onDragLeave={dragLeaveHandler} onDrop={dropHandler} onDoubleClick={doubleClickHandler}>
      <StyledBackground>
        <StyledNumber>
          {display.destination === BlockDestination.RESULT_COLUMN ? displayNumber : "0"}
        </StyledNumber>
      </StyledBackground>
      <ElementStrike element={display}/>
    </StyledDisplayWrapper>
  );
};

const StyledDisplayWrapper = styled.div<StyledDisplayProps>`
  width: 100%;
  height: 6rem;
  padding: 4px;
  border-radius: 6px;
  position: relative;
  
  cursor: ${({display}) => {
    switch (display.status) {
      case BlockStatus.DRAG:
        return "move";
      case BlockStatus.NOT_ACTIVE:
        return "default";
      case BlockStatus.ACTIVE:
        return "default";
      default:
        return "move";
    }
  }};
  opacity: ${({display}) => {
    switch (display.status) {
      case BlockStatus.NOT_ACTIVE:
        return 0.5;
      default:
        return 1;
    }
  }};
  box-shadow: ${({display}) => {
    switch (display.destination) {
      case BlockDestination.RESULT_COLUMN:
        return "none";
      case BlockDestination.INITIAL_COLUMN:
        return "0 2px 6px rgba(0,0,0,0.1)";
    }
  }};
`

const StyledBackground = styled.div`
  border-radius: 6px;
  background-color: #f3f4f6;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  padding: 0 0.8rem;
`

const StyledNumber = styled.span`
  font-size: 2.6rem;
  line-height: 3rem;
  font-weight: 800;
`

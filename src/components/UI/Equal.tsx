import { FC } from "react";
import {BlockDestination, BlockStatus, IBlock} from "../../types/calculator";
import styled from "styled-components";
import {EqualButton} from "./Buttons/EqualButton";
import {ElementStrike} from "./Strike/ElementStrike";
import {useElementsDrag} from "../../hooks/useElementsDrag";
import {useElementsReturn} from "../../hooks/useElementsReturn";

interface EqualProps {
  equalButton: IBlock;
}

interface StyledEqualProps {
  equalButton: IBlock;
}

export const Equal: FC<EqualProps> = ({ equalButton }) => {
  const {isDraggable, dragLeaveHandler, dragStartHandler, dropHandler, dragOverHandler} = useElementsDrag(equalButton);
  const {doubleClickHandler} = useElementsReturn(equalButton);

  return (
    <StyledButtonWrapper equalButton={equalButton} draggable={isDraggable} onDragStart={dragStartHandler} onDragOver={dragOverHandler} onDragLeave={dragLeaveHandler} onDrop={dropHandler} onDoubleClick={doubleClickHandler}>
      <EqualButton equalButton={equalButton} />
      <ElementStrike element={equalButton} />
    </StyledButtonWrapper>
  );
};

const StyledButtonWrapper = styled.div<StyledEqualProps>`
  width: 100%;
  height: 7.2rem;
  padding: 4px;
  border-radius: 6px;
  position: relative;
  
  cursor: ${({equalButton}) => {
    switch (equalButton.status) {
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
  opacity: ${({equalButton}) => {
    switch (equalButton.status) {
      case BlockStatus.NOT_ACTIVE:
        return 0.5;
      default:
        return 1;
    }
  }};
  box-shadow: ${({equalButton}) => {
    switch (equalButton.destination) {
      case BlockDestination.RESULT_COLUMN:
        return "none";
      case BlockDestination.INITIAL_COLUMN:
        return "0 2px 6px rgba(0,0,0,0.1)";
    }
  }};
`
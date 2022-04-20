import { FC } from "react";
import {BlockDestination, BlockStatus, IBlock} from "../../types/calculator";
import { OperationsType } from "../../types/result";
import { OperationButton } from "./Buttons/OperationButton";
import {ElementStrike} from "./Strike/ElementStrike";
import {useElementsDrag} from "../../hooks/useElementsDrag";
import {useElementsReturn} from "../../hooks/useElementsReturn";
import styled from "styled-components";

interface OperationsProps {
  operations: IBlock;
}

interface StyledOperationsProps {
  operations: IBlock;
}

export const Operations: FC<OperationsProps> = ({ operations }) => {
  const {isDraggable, dragLeaveHandler, dragStartHandler, dropHandler, dragOverHandler} = useElementsDrag(operations);
  const {doubleClickHandler} = useElementsReturn(operations)

  return (
    <StyledOperations operations={operations} draggable={isDraggable} onDragStart={dragStartHandler} onDragOver={dragOverHandler} onDragLeave={dragLeaveHandler} onDrop={dropHandler} onDoubleClick={doubleClickHandler}>
      <OperationButton value={OperationsType.DIVISION} status={operations.status} />
      <OperationButton value={OperationsType.MULTIPLICATION} status={operations.status}/>
      <OperationButton value={OperationsType.SUBTRACTION} status={operations.status} />
      <OperationButton value={OperationsType.ADDITION} status={operations.status} />
      <ElementStrike element={operations}/>
    </StyledOperations>
  );
};

const StyledOperations = styled.div<StyledOperationsProps>`
  width: 100%;
  height: 6rem;
  padding: 4px;
  border-radius: 6px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  position: relative;

  cursor: ${({operations}) => {
    switch (operations.status) {
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
  opacity: ${({operations}) => {
    switch (operations.status) {
      case BlockStatus.NOT_ACTIVE:
        return 0.5;
      default:
        return 1;
    }
  }};
  box-shadow: ${({operations}) => {
    switch (operations.destination) {
      case BlockDestination.RESULT_COLUMN:
        return "none";
      case BlockDestination.INITIAL_COLUMN:
        return "0 2px 6px rgba(0,0,0,0.1)";
    }
  }};
`
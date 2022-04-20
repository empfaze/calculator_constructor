import {BlockDestination, BlockType, IBlock} from "../../../types/calculator";
import {FC} from "react";
import styled, {css} from "styled-components";
import {selectCurrentDraggedElement, selectDraggedOverElement} from "../../../auxiliary/selectors";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

interface StrikeProps {
  element: IBlock;
}

interface StyledStrikeProps {
  element: IBlock;
  draggedOverElement: IBlock | null;
  currentDraggedElement: IBlock | null;
}

export const ElementStrike: FC<StrikeProps> = ({ element }) => {
  const draggedOverElement = useTypedSelector(selectDraggedOverElement);
  const currentDraggedElement = useTypedSelector(selectCurrentDraggedElement);

  return <StyledElementStrike element={element} currentDraggedElement={currentDraggedElement} draggedOverElement={draggedOverElement}/>
}

const StyledElementStrike = styled.div<StyledStrikeProps>`
  position: absolute;
  bottom: -0.7rem;
  left: -1%;
  height: 1px;
  width: 102%;
  background-color: #5d5fef;

  visibility: hidden;
  opacity: 0;
  pointer-events: none;

  transition: all 0.15s ease-in;

  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 5px;
    height: 5px;
    top: -2px;
    left: -3px;
    background-color: #5d5fef;
    border-radius: 50%;
  }

  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 5px;
    height: 5px;
    top: -2px;
    right: -3px;
    background-color: #5d5fef;
    border-radius: 50%;
  }
  
  ${({element, draggedOverElement, currentDraggedElement}) => element.id === draggedOverElement?.id && 
          currentDraggedElement?.type !== BlockType.DISPLAY && 
          element.destination === BlockDestination.RESULT_COLUMN &&
          element.id !== currentDraggedElement?.id && ActiveStrike}
`

const ActiveStrike = css`
  visibility: visible;
  opacity: 1;
`
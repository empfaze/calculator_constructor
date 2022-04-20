import {useTypedSelector} from "../../../hooks/useTypedSelector";
import styled, {css} from "styled-components";
import {selectCurrentDraggedElement, selectIsDropAreaDraggedOver, selectResultColumn} from "../../../auxiliary/selectors";
import {BlockDestination, BlockType, IBlock} from "../../../types/calculator";

interface StyledDropAreaProps {
  currentDraggedElement: IBlock | null;
  resultColumn: IBlock[];
  isDropAreaDraggedOver: boolean;
}

export const DropAreaStrike = () => {
  const currentDraggedElement = useTypedSelector(selectCurrentDraggedElement);
  const resultColumn = useTypedSelector(selectResultColumn);
  const isDropAreaDraggedOver = useTypedSelector(selectIsDropAreaDraggedOver)

  return <StyledDropAreaStrike resultColumn={resultColumn} isDropAreaDraggedOver={isDropAreaDraggedOver} currentDraggedElement={currentDraggedElement}/>
}

const StyledDropAreaStrike = styled.div<StyledDropAreaProps>`
  position: absolute;
  top: 0;
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

  ${({currentDraggedElement, resultColumn, isDropAreaDraggedOver}) => currentDraggedElement?.type === BlockType.DISPLAY &&
          resultColumn.length > 0 && isDropAreaDraggedOver &&
          currentDraggedElement.destination === BlockDestination.INITIAL_COLUMN && ActiveStrike}
`

const ActiveStrike = css`
  visibility: visible;
  opacity: 1;
  pointer-events: all;
`
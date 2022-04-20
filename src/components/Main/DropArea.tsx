import {BlockType, IBlock} from "../../types/calculator";
import { Display } from "../UI/Display";
import { Numbers } from "../UI/Numbers";
import { Operations } from "../UI/Operations";
import { EmptyList } from "../UI/EmtyList";
import {selectIsDropAreaDraggedOver, selectResultColumn} from "../../auxiliary/selectors";
import styled, {css} from "styled-components";
import {useDropAreaDrag} from "../../hooks/useDropAreaDrag";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Equal} from "../UI/Equal";
import {DropAreaStrike} from "../UI/Strike/DropAreaStrike";

interface StyledDropAreaProps {
  resultColumn: IBlock[];
  isDropAreaDraggedOver: boolean;
}

export const DropArea = () => {
  const resultColumn = useTypedSelector(selectResultColumn);
  const isDropAreaDraggedOver = useTypedSelector(selectIsDropAreaDraggedOver);

  const { dropHandler, dragOverHandler, dragLeaveHandler } = useDropAreaDrag();

  const components = resultColumn.map((block) => {
    switch (block.type) {
      case BlockType.DISPLAY:
        return <Display key={block.id} display={block} />;
      case BlockType.EQUAL_BUTTON:
        return <Equal key={block.id} equalButton={block} />;
      case BlockType.NUMBERS:
        return <Numbers key={block.id} numbers={block} />;
      case BlockType.OPERATIONS:
        return <Operations key={block.id} operations={block} />;
      default:
        break;
    }
  })

  return (
    <StyledDropArea resultColumn={resultColumn} isDropAreaDraggedOver={isDropAreaDraggedOver} onDragOver={dragOverHandler} onDragLeave={dragLeaveHandler} onDrop={dropHandler}>
      <DropAreaStrike />
      {resultColumn.length === 0 && <EmptyList />}
      {resultColumn.length > 0 && components}
    </StyledDropArea>
  );
};

const StyledDropArea = styled.div<StyledDropAreaProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 24.4rem;
  min-height: 45.6rem;
  height: auto;
  
  position: relative;

  border-radius: 6px;
  border: 2px dashed #c4c4c4;
  background-color: ${({resultColumn, isDropAreaDraggedOver}) => resultColumn.length === 0 && isDropAreaDraggedOver ? "#f0f9ff" : "#ffffff"};

  transition: all 0.1s ease-in;
  ${({resultColumn}) => resultColumn.length > 0 && ActiveDropArea}
`

const ActiveDropArea = css`
  border-color: transparent;

  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 1.2rem;

  align-content: start;
`
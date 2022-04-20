import {selectCurrentDraggedElement, selectDraggedOverElement, selectResultColumn} from "../auxiliary/selectors";
import {BlockDestination, BlockType} from "../types/calculator";
import {DragEvent} from "react";
import {useTypedSelector} from "./useTypedSelector";
import {useTypedActions} from "./useTypedActions";

export const useDropAreaDrag = () => {
  const resultColumn = useTypedSelector(selectResultColumn);
  const currentDraggedElement = useTypedSelector(selectCurrentDraggedElement);
  const draggedOverElement = useTypedSelector(selectDraggedOverElement);

  const {addElementToResultColumn, setCurrentDraggedElement, setDraggedOverElement, setDropAreaDraggedOver} = useTypedActions();

  function dragOverHandler(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    setDropAreaDraggedOver(true);

    if (currentDraggedElement?.type === BlockType.DISPLAY) return;

    if (!draggedOverElement && currentDraggedElement?.destination === BlockDestination.INITIAL_COLUMN)
      setDraggedOverElement(resultColumn[resultColumn.length - 1]);
  }

  function dragLeaveHandler(): void {
    setDraggedOverElement(null);
    setDropAreaDraggedOver(false);
  }

  function dropHandler(): void {
    setDropAreaDraggedOver(false);
    setCurrentDraggedElement(null);
    setDraggedOverElement(null);
    addElementToResultColumn({ ...currentDraggedElement! });
  }

  return { dragOverHandler, dragLeaveHandler, dropHandler }
}
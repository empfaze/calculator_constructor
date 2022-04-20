import {BlockDestination, BlockStatus, IBlock} from "../types/calculator";
import {DragEvent} from "react";
import {selectCurrentDraggedElement} from "../auxiliary/selectors";
import {useTypedSelector} from "./useTypedSelector";
import {useTypedActions} from "./useTypedActions";

export const useElementsDrag = (element: IBlock) => {
    const currentDraggedElement = useTypedSelector(selectCurrentDraggedElement);
    const {changeOrderOfElements, setCurrentDraggedElement, setDraggedOverElement, setDropAreaDraggedOver} = useTypedActions();

    const isDraggable = element.status === BlockStatus.DRAG;

    function dragStartHandler(): void {
        setCurrentDraggedElement(element);
    }

    function dragOverHandler(e: DragEvent<HTMLDivElement>): void {
        if (element.destination === BlockDestination.INITIAL_COLUMN || element.id === currentDraggedElement?.id)
            return;

        e.preventDefault();

        setDraggedOverElement(element);
    }

    function dragLeaveHandler(): void {
        if (element.destination === BlockDestination.INITIAL_COLUMN) return;

        setDraggedOverElement(null);
    }

    function dropHandler(e: DragEvent<HTMLDivElement>): void {
        e.stopPropagation();

        if (element.destination === BlockDestination.INITIAL_COLUMN || currentDraggedElement?.id === element.id)
            return;

        changeOrderOfElements({
            bottomElement: element,
            topElement: { ...currentDraggedElement! },
        });

        setDraggedOverElement(null);
        setCurrentDraggedElement(null);
        setDropAreaDraggedOver(false);
    }

    return {isDraggable, dragStartHandler, dragOverHandler, dragLeaveHandler, dropHandler}
}
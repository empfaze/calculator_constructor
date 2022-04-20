export enum BlockType {
  DISPLAY = "DISPLAY",
  OPERATIONS = "OPERATIONS",
  NUMBERS = "NUMBERS",
  EQUAL_BUTTON = "EQUAL_BUTTON",
}

export enum BlockStatus {
  ACTIVE = "ACTIVE",
  NOT_ACTIVE = "NOT_ACTIVE",
  DRAG = "DRAG",
}

export enum BlockDestination {
  INITIAL_COLUMN = "INITIAL_COLUMN",
  RESULT_COLUMN = "RESULT_COLUMN",
}

export interface IBlock {
  id: number;
  type: BlockType;
  destination: BlockDestination;
  status: BlockStatus;
}

export interface CalcState {
  initialColumn: IBlock[];
  resultColumn: IBlock[];
  currentDraggedElement: null | IBlock;
  temporaryInactiveDragElementIDs: number[];
  draggedOverElement: null | IBlock;
  isDropAreaDraggedOver: boolean;
}

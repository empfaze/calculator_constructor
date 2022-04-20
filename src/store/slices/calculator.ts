import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BlockDestination, BlockStatus, BlockType, CalcState, IBlock,} from "../../types/calculator";

const initialState: CalcState = {
  initialColumn: [
    {id: 1, type: BlockType.DISPLAY, status: BlockStatus.DRAG, destination: BlockDestination.INITIAL_COLUMN,},
    {id: 2, type: BlockType.OPERATIONS, status: BlockStatus.DRAG, destination: BlockDestination.INITIAL_COLUMN,},
    {id: 3, type: BlockType.NUMBERS, status: BlockStatus.DRAG, destination: BlockDestination.INITIAL_COLUMN,},
    {id: 4, type: BlockType.EQUAL_BUTTON, status: BlockStatus.DRAG, destination: BlockDestination.INITIAL_COLUMN,},
  ],
  resultColumn: [] as IBlock[],
  currentDraggedElement: null,
  temporaryInactiveDragElementIDs: [] as number[],
  draggedOverElement: null,
  isDropAreaDraggedOver: false
};

const calcSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    setDropAreaDraggedOver: (state, action: PayloadAction<boolean>) => {
      state.isDropAreaDraggedOver = action.payload;
    },

    setCurrentDraggedElement: (state, action: PayloadAction<IBlock | null>) => {
      state.currentDraggedElement = action.payload;
    },

    addElementToResultColumn: (state, action: PayloadAction<IBlock>) => {
      if (state.resultColumn.find((elem) => elem.id === action.payload.id))
        return;

      if (action.payload.type === BlockType.DISPLAY)
        state.resultColumn.unshift({...action.payload, destination: BlockDestination.RESULT_COLUMN, status: BlockStatus.ACTIVE,});
      else
        state.resultColumn.push({...action.payload, destination: BlockDestination.RESULT_COLUMN,});

      const necessaryInitialElement = state.initialColumn.find((elem) => elem.id === action.payload.id);
      necessaryInitialElement!.status = BlockStatus.NOT_ACTIVE;
    },

    setResultElementsActiveStatus: (state) => {
      state.resultColumn.forEach((item) => (item.status = BlockStatus.ACTIVE));
    },

    setResultElementsDragStatus: (state) => {
      state.resultColumn.forEach((item) => {
        if (item.type === BlockType.DISPLAY) return;

        item.status = BlockStatus.DRAG;
      });
    },

    setInitialElementsInactiveStatus: (state) => {
      const initialAvailableDragElements = state.initialColumn.filter((item) => item.status === BlockStatus.DRAG);

      if (initialAvailableDragElements.length === 0) return;

      state.initialColumn.forEach((elem) => {
        if (elem.status === BlockStatus.DRAG) {
          elem.status = BlockStatus.NOT_ACTIVE;
          state.temporaryInactiveDragElementIDs.push(elem.id);
        }
      });
    },

    setInitialElementsDragStatus: (state) => {
      if (state.temporaryInactiveDragElementIDs.length === 0) return;

      state.temporaryInactiveDragElementIDs.forEach((id) => {
        state.initialColumn.forEach((elem) => {
          if (elem.id === id) elem.status = BlockStatus.DRAG;
        });
      });

      state.temporaryInactiveDragElementIDs = [];
    },

    returnElementToInitialColumn: (state, action: PayloadAction<BlockType>) => {
      const initialColumnElement = state.initialColumn.find((elem) => elem.type === action.payload);
      initialColumnElement!.status = BlockStatus.DRAG;

      switch (action.payload) {
        case BlockType.DISPLAY:
          state.resultColumn = state.resultColumn.filter((elem) => elem.type !== BlockType.DISPLAY);
          break;
        case BlockType.EQUAL_BUTTON:
          state.resultColumn = state.resultColumn.filter((elem) => elem.type !== BlockType.EQUAL_BUTTON);
          break;
        case BlockType.NUMBERS:
          state.resultColumn = state.resultColumn.filter((elem) => elem.type !== BlockType.NUMBERS);
          break;
        case BlockType.OPERATIONS:
          state.resultColumn = state.resultColumn.filter((elem) => elem.type !== BlockType.OPERATIONS);
          break;
      }
    },

    changeOrderOfElements: (
      state,
      action: PayloadAction<{ bottomElement: IBlock; topElement: IBlock }>
    ) => {
      switch (action.payload.topElement.destination) {
        case BlockDestination.INITIAL_COLUMN:
          const bottomElementIdx = state.resultColumn.findIndex((elem) => elem.id === action.payload.bottomElement.id);

          if (action.payload.topElement.type === BlockType.DISPLAY) {
            state.resultColumn.unshift({...action.payload.topElement, status: BlockStatus.ACTIVE, destination: BlockDestination.RESULT_COLUMN,});
          } else
            state.resultColumn.splice(bottomElementIdx + 1, 0, {...action.payload.topElement, destination: BlockDestination.RESULT_COLUMN,});
          break;
        case BlockDestination.RESULT_COLUMN:
          const topElementIndex = state.resultColumn.findIndex((elem) => elem.id === action.payload.topElement.id);
          state.resultColumn.splice(topElementIndex, 1);

          const bottomElementIndex = state.resultColumn.findIndex((elem) => elem.id === action.payload.bottomElement.id);
          state.resultColumn.splice(bottomElementIndex + 1, 0, {...action.payload.topElement,});
          break;
      }

      const necessaryInitialElement = state.initialColumn.find((elem) => elem.id === action.payload.topElement.id);
      necessaryInitialElement!.status = BlockStatus.NOT_ACTIVE;
    },

    setDraggedOverElement: (state, action: PayloadAction<null | IBlock>) => {
      if (action.payload?.destination === BlockDestination.INITIAL_COLUMN) return;
      state.draggedOverElement = action.payload;
    },
  },
});

export const calcReducer = calcSlice.reducer;
export const calcActions = calcSlice.actions;

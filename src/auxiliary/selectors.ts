import {CalcState} from "../types/calculator";
import {ResultState} from "../types/result";

export const selectInitialColumn = (state: { calculator: CalcState }) => state.calculator.initialColumn;
export const selectResultColumn = (state: { calculator: CalcState }) => state.calculator.resultColumn;
export const selectCurrentDraggedElement = (state: { calculator: CalcState }) => state.calculator.currentDraggedElement;
export const selectDraggedOverElement = (state: { calculator: CalcState }) => state.calculator.draggedOverElement;
export const selectTemporaryInactiveDragElementIDs = (state: { calculator: CalcState }) => state.calculator.temporaryInactiveDragElementIDs;
export const selectIsDropAreaDraggedOver = (state: { calculator: CalcState }) => state.calculator.isDropAreaDraggedOver;

export const selectResult = (state: { result: ResultState }) => state.result.result;
export const selectFirstNumber = (state: { result: ResultState }) => state.result.firstNumber;
export const selectOperand = (state: { result: ResultState }) => state.result.operand;
export const selectSecondNumber = (state: { result: ResultState }) => state.result.secondNumber;
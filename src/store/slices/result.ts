import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  INFINITY,
  NumberButtonValue,
  NumberPayload,
  OperationsType,
  ResultNumberType,
  ResultState,
} from "../../types/result";

const initialState: ResultState = {
  firstNumber: "0",
  operand: null,
  secondNumber: null,
  result: null,
};

const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    addDataToNumber: (state, action: PayloadAction<NumberPayload>) => {
      switch (action.payload.numberType) {
        case ResultNumberType.FIRST_NUMBER:
          if (state.firstNumber === INFINITY && action.payload.value === NumberButtonValue.COMMA) return;

          if (action.payload.value === NumberButtonValue.COMMA && state.firstNumber?.includes(",")) return;

          if (action.payload.value === NumberButtonValue.ZERO && state.firstNumber?.length === 1 && state.firstNumber[0] === NumberButtonValue.ZERO) return;

          if ((state.firstNumber === NumberButtonValue.ZERO || (state.result && state.firstNumber)) && action.payload.value !== NumberButtonValue.COMMA) {
            state.firstNumber = action.payload.value;
          } else state.firstNumber += action.payload.value;

          state.result = null;
          break;
        case ResultNumberType.SECOND_NUMBER:
          if (action.payload.value === NumberButtonValue.COMMA && state.secondNumber?.includes(",")) return;

          if (action.payload.value === NumberButtonValue.ZERO && state.secondNumber?.length === 1 && state.secondNumber[0] === NumberButtonValue.ZERO) return;

          if (!state.secondNumber && action.payload.value !== NumberButtonValue.COMMA)
            state.secondNumber = action.payload.value;
          else state.secondNumber += action.payload.value;

          break;
      }
    },

    setOperand: (state, action: PayloadAction<string>) => {
      const tempValue = state.firstNumber;

      if (tempValue!.split("").pop() === NumberButtonValue.COMMA)
        state.firstNumber = state.firstNumber!.slice(0, state.firstNumber!.lastIndexOf(","));

      state.operand = action.payload;
    },

    countValue: (state) => {
      const tempValue = state.secondNumber;

      if (tempValue!.split("").pop() === NumberButtonValue.COMMA)
        state.secondNumber = state.secondNumber!.slice(0, state.secondNumber!.lastIndexOf(","));

      switch (state.operand) {
        case OperationsType.ADDITION:
          const addResult = String(Number(state.firstNumber?.replace(",", ".")) + Number(state.secondNumber?.replace(",", ".")));
          addResult.length > 8
            ? (state.result = String(Number(addResult).toPrecision(8)).replace(".", ","))
            : (state.result = addResult.replace(".", ","));
          break;
        case OperationsType.DIVISION:
          if (state.secondNumber === NumberButtonValue.ZERO) {
            state.result = INFINITY;
            break;
          }

          const divisionResult = String(Number(state.firstNumber?.replace(",", ".")) / Number(state.secondNumber?.replace(",", ".")));
          divisionResult.length > 8
            ? (state.result = String(Number(divisionResult).toPrecision(8)).replace(".", ","))
            : (state.result = divisionResult.replace(".", ","));
          break;
        case OperationsType.MULTIPLICATION:
          const multiplicationResult = String(Number(state.firstNumber?.replace(",", ".")) * Number(state.secondNumber?.replace(",", ".")));
          multiplicationResult.length > 8
            ? (state.result = String(Number(multiplicationResult).toPrecision(8)).replace(".", ","))
            : (state.result = multiplicationResult.replace(".", ","));
          break;
        case OperationsType.SUBTRACTION:
          const subtractionResult = String(Number(state.firstNumber?.replace(",", ".")) - Number(state.secondNumber?.replace(",", ".")));
          subtractionResult.length > 8
            ? (state.result = String(Number(subtractionResult).toPrecision(8)).replace(".", ","))
            : (state.result = subtractionResult.replace(".", ","));
          break;
      }

      state.firstNumber = state.result;
      state.secondNumber = null;
      state.operand = null;
    },

    resetResultData: (state) => {
      state.firstNumber = "0";
      state.secondNumber = null;
      state.operand = null;
      state.result = null;
    },
  },
});

export const resultReducer = resultSlice.reducer;
export const resultActions = resultSlice.actions;

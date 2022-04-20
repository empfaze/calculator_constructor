export interface ResultState {
  firstNumber: null | string;
  operand: null | string;
  secondNumber: null | string;
  result: null | string;
}

export enum OperationsType {
  ADDITION = "+",
  SUBTRACTION = "-",
  MULTIPLICATION = "x",
  DIVISION = "/",
}

export enum NumberButtonValue {
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX = "6",
  SEVEN = "7",
  EIGHT = "8",
  NINE = "9",
  ZERO = "0",
  DEL = "C",
  COMMA = ",",
}

export const INFINITY = "Не определено";

export enum ResultNumberType {
  FIRST_NUMBER = "FIRST_NUMBER",
  SECOND_NUMBER = "SECOND_NUMBER",
}

export interface NumberPayload {
  value: string;
  numberType: ResultNumberType;
}

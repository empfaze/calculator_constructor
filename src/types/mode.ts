export enum ModeType {
  RUNTIME = "RUNTIME",
  CONSTRUCTOR = "CONSTRUCTOR",
}

export interface IModeState {
  activeMode: ModeType;
}

import React from "react";
import { ModeType } from "../types/mode";

export interface IModeContext {
  mode: ModeType;
  setMode: (type: ModeType) => void;
}

export const ModeContext = React.createContext<IModeContext | null>(null);

import {BlockDestination, IBlock} from "../types/calculator";
import {ModeType} from "../types/mode";
import {useContext} from "react";
import {ModeContext} from "../context/mode";
import {useTypedActions} from "./useTypedActions";

export const useElementsReturn = (element: IBlock) => {
  const modeContext = useContext(ModeContext);

  const {returnElementToInitialColumn} = useTypedActions();

  function doubleClickHandler () {
    if (element.destination === BlockDestination.INITIAL_COLUMN) return;
    else if (element.destination === BlockDestination.RESULT_COLUMN && modeContext!.mode === ModeType.CONSTRUCTOR)
      returnElementToInitialColumn(element.type);
  }

  return { doubleClickHandler }
}
import { Display } from "../UI/Display";
import { Equal } from "../UI/Equal";
import { Numbers } from "../UI/Numbers";
import { Operations } from "../UI/Operations";
import styled from "styled-components";
import {selectInitialColumn} from "../../auxiliary/selectors";
import {ModeType} from "../../types/mode";
import {useContext} from "react";
import {ModeContext} from "../../context/mode";
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface StyledCalculatorProps {
  mode: ModeType;
}

export const Calculator = () => {
  const [display, operations, numbers, equalButton] = useTypedSelector(selectInitialColumn);
  const modeContext = useContext(ModeContext)

  return (
    <StyledWrapper mode={modeContext!.mode}>
      <StyledBody>
        <Display display={display} />
        <Operations operations={operations} />
        <Numbers numbers={numbers} />
        <Equal equalButton={equalButton} />
      </StyledBody>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<StyledCalculatorProps>`
  width: 100%;
  max-width: 24.4rem;

  margin-right: 1rem;

  display: flex;
  align-items: center;
  
  opacity: ${({mode}) => {
    switch (mode) {
      case ModeType.CONSTRUCTOR:
        return 1;
      case ModeType.RUNTIME:
        return 0;
    }
  }};

  visibility: ${({mode}) => {
    switch (mode) {
      case ModeType.CONSTRUCTOR:
        return "visible";
      case ModeType.RUNTIME:
        return "hidden";
    }
  }};

  pointer-events: ${({mode}) => {
    switch (mode) {
      case ModeType.CONSTRUCTOR:
        return "auto";
      case ModeType.RUNTIME:
        return "none";
    }
  }}
`

const StyledBody = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 1.2rem;

  width: 100%;
  max-width: 24rem;
  margin: 0 auto;
`

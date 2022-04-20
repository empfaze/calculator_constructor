import { Mode } from "./Main/Mode";
import { Calculator } from "./Main/Calculator";
import { DropArea } from "./Main/DropArea";
import {useEffect, useState} from "react";
import { ModeType } from "../types/mode";
import { IModeContext, ModeContext } from "../context/mode";
import styled from "styled-components";
import {useTypedActions} from "../hooks/useTypedActions";

export const App = () => {
  const {resetResultData, setInitialElementsDragStatus, setInitialElementsInactiveStatus, setResultElementsActiveStatus, setResultElementsDragStatus} = useTypedActions();

  const [activeMode, setActiveMode] = useState<ModeType>(ModeType.CONSTRUCTOR);

  const modeContext: IModeContext = {
    mode: activeMode,
    setMode: setActiveMode,
  };

  useEffect(() => {
    switch (modeContext?.mode) {
      case ModeType.RUNTIME:
        setResultElementsActiveStatus();
        setInitialElementsInactiveStatus();
        break;
      case ModeType.CONSTRUCTOR:
        setInitialElementsDragStatus();
        setResultElementsDragStatus();
        resetResultData();
        break;
    }
  }, [modeContext?.mode])

  return (
    <StyledMainWrapper>
      <StyledOuterWrapper>
        <StyledInnerWrapper>
          <ModeContext.Provider value={modeContext}>
            <Mode />
            <StyledCalcWrapper>
              <Calculator />
              <DropArea />
            </StyledCalcWrapper>
          </ModeContext.Provider>
        </StyledInnerWrapper>
      </StyledOuterWrapper>
    </StyledMainWrapper>
  );
};

const StyledMainWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  background-color: #e5e5e5;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 1rem;
`

const StyledOuterWrapper = styled.div`
  width: 100%;
  max-width: 69.5rem;
  padding: 1rem 2rem;

  background-color: #ffffff;

  @media (max-width: 43.75em) {
    padding: 1rem;
  }
`

const StyledInnerWrapper = styled.div`
  width: 100%;
  max-width: 53.5rem;
  margin: 2.5rem auto;

  display: flex;
  flex-direction: column;
`

const StyledCalcWrapper = styled.section`
  display: flex;
  justify-content: space-between;

  margin-top: 2rem;
`
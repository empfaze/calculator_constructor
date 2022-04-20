import { FC } from "react";
import { ModeType } from "../../types/mode";
import { ModeButton } from "../UI/Buttons/ModeButton";
import styled from "styled-components";

interface ModeProps {}

export const Mode: FC<ModeProps> = () => {
  return (
    <StyledForm>
      <ModeButton type={ModeType.RUNTIME} />
      <ModeButton type={ModeType.CONSTRUCTOR} />
    </StyledForm>
  );
};

const StyledForm = styled.div`
  width: 100%;
  max-width: 24.5rem;
  align-self: flex-end;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 6px;
  background-color: #f3f4f6;
  padding: 1px;

  @media (max-width: 31.25em) {
    align-self: center;
  }
`
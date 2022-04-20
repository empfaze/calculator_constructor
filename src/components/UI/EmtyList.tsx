import { DropIcon } from "./Icons/DropIcon";
import styled from "styled-components";

export const EmptyList = () => {
  return (
    <StyledEmptyList>
      <DropIcon />
      <Title>Перетащите сюда</Title>
      <Text>любой элемент<br />из левой панели</Text>
    </StyledEmptyList>
  );
};

const StyledEmptyList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.span`
  font-size: 1.4rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: #5d5fef;

  margin-bottom: 5px;
`

const Text = styled.span`
  color: #6b7280;
  font-size: 1.2rem;
  line-height: 1.4rem;

  text-align: center;
`
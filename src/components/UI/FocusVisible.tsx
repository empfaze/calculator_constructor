import styled from "styled-components";

export const FocusVisible = styled.div`
  &.js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }

  .js-focus-visible .focus-visible {
    outline: 1px solid #528deb;
  }
`
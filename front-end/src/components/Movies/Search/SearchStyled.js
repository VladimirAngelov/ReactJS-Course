import styled from "styled-components"

export const SearchField = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid #ff8c00;
  border-radius: 0;
  color: #ff8c00;
  animation-name: show;
  animation-duration: 2s;
  max-width: 8em;
  
  &::placeholder {
    color: darkorange;
    opacity: 0.6;
  }

  @keyframes show {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`
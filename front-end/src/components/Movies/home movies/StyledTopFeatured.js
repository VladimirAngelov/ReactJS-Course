import styled from 'styled-components'

export const Description = styled.div`
  font-size: 16px;
  margin-top: 10px;
  max-width: 600px;
`

export const Runtime = styled.span`
  font-size: 16px;
  color: #ababab;
  margin-left: 10px;
  letter-spacing: 1px;
`

export const Title = styled.h1`
  color: white;
  margin: 80px 0 0 60px;
  position: absolute;
  max-width: 700px;
  z-index: 1;
  font-weight: bold;
`
export const ShowDetails = styled.span`
  font-size: 16px;
  font-style: italic;
  font-weight: initial;
  
  a {
    color: white;
    
    &:hover {
      opacity: 0.5;
    }
  }
`
import styled from 'styled-components'

export const Title = styled.h3`
  color: white;
`

export const Table = styled.table`
  margin-top: 10px;
  margin-left: 10px;
  background: transparent;
  //border: 1px solid #ababab;
  width: 95%;
`

export const Th = styled.th`
  text-align: center;
  color: white;
  border-bottom: 1px solid #ababab;
`

export const Td = styled.td`
  color: white;
  padding: 8px;
  border-bottom: 1px solid white;
  //border-left: 1px solid white;
  text-align: center;
  
  a {
    color: #ff8c00;
    text-shadow: 3px 3px 3px black;
    
    &:hover {
      opacity: 0.5;
    }
  }
`
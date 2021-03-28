import styled from 'styled-components'

// <table>
    // <tbody>
        // <tr>
            // <td>Something</td>
            // <td>Something</td>
        // </tr>
    // </tbody>
// </table>

export const Title = styled.h3`
  color: white;
`

export const Table = styled.table`
  margin-top: 20px;
  background: transparent;
  border: 1px solid #ababab;
  width: 80%;
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
`
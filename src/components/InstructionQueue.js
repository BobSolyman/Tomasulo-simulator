import React from 'react'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(id, instruction, issue, execute, writeResult) {
  return { id, instruction, issue, execute, writeResult };
}

function InstructionQueue({data}) {
    var rows = [];
    for(var i=0; i<data.id.length; i++){
        let issue = "";
        let execute = "";
        let writeResult = "";
        if(data.issue.length>i){
            issue = data.issue[i]
        }
        if(data.execute.length>i){
            execute = data.execute[i]
        }
        if(data.writeResult.length>i){
            writeResult = data.writeResult[i]
        }
        rows.push(createData(data.id[i], data.instruction[i], issue, execute, writeResult))
    }

    return (
        <div>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Instruction</StyledTableCell>
            <StyledTableCell align="right">Issue</StyledTableCell>
            <StyledTableCell align="right">Execute</StyledTableCell>
            <StyledTableCell align="right">Write Result</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.instruction}
              </StyledTableCell>
              <StyledTableCell align="right">{row.issue}</StyledTableCell>
              <StyledTableCell align="right">{row.execute}</StyledTableCell>
              <StyledTableCell align="right">{row.writeResult}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    )
}

export default InstructionQueue

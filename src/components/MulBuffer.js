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

function createData(name, id, Op, Vj, Vk, Qj, Qk, busy, cyclesRemaining) {
  return { name, id, Op, Vj, Vk, Qj, Qk, busy, cyclesRemaining };
}

function MulBuffer({buffer}) {
    const rows = [
        createData("M1", buffer[0].id, buffer[0].op, buffer[0].Vj, buffer[0].Vk, buffer[0].Qj, buffer[0].Qk, buffer[0].busy, buffer[0].cyclesRemaining),
        createData("M2", buffer[1].id, buffer[1].op, buffer[1].Vj, buffer[1].Vk, buffer[1].Qj, buffer[1].Qk, buffer[1].busy, buffer[1].cyclesRemaining),
        createData("M3", buffer[2].id, buffer[2].op, buffer[2].Vj, buffer[2].Vk, buffer[2].Qj, buffer[2].Qk, buffer[2].busy, buffer[2].cyclesRemaining),
    ];



    return (
        <div>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Op</StyledTableCell>
            <StyledTableCell align="right">Vj</StyledTableCell>
            <StyledTableCell align="right">Vk</StyledTableCell>
            <StyledTableCell align="right">Qj</StyledTableCell>
            <StyledTableCell align="right">Qk</StyledTableCell>
            <StyledTableCell align="right">Busy</StyledTableCell>
            <StyledTableCell align="right">Cycles Remaining</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.Op}</StyledTableCell>
              <StyledTableCell align="right">{row.Vj}</StyledTableCell>
              <StyledTableCell align="right">{row.Vk}</StyledTableCell>
              <StyledTableCell align="right">{row.Qj}</StyledTableCell>
              <StyledTableCell align="right">{row.Qk}</StyledTableCell>
              <StyledTableCell align="right">{row.busy}</StyledTableCell>
              <StyledTableCell align="right">{row.cyclesRemaining}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    )
}

export default MulBuffer

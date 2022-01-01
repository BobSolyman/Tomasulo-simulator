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
        createData("M1", buffer.M1.id, buffer.M1.op, buffer.M1.Vj, buffer.M1.Vk, buffer.M1.Qj, buffer.M1.Qk, buffer.M1.busy, buffer.M1.cyclesRemaining),
        createData("M2", buffer.M2.id, buffer.M2.op, buffer.M2.Vj, buffer.M2.Vk, buffer.M2.Qj, buffer.M2.Qk, buffer.M2.busy, buffer.M2.cyclesRemaining),
        createData("M3", buffer.M3.id, buffer.M3.op, buffer.M3.Vj, buffer.M3.Vk, buffer.M3.Qj, buffer.M3.Qk, buffer.M3.busy, buffer.M3.cyclesRemaining),
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
            <StyledTableCell align="right">cycles Remaining</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
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

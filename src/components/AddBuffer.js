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

function AddBuffer({buffer}) {
    const rows = [
        createData("A1", buffer.A1.id, buffer.A1.op, buffer.A1.Vj, buffer.A1.Vk, buffer.A1.Qj, buffer.A1.Qk, buffer.A1.busy, buffer.A1.cyclesRemaining),
        createData("A2", buffer.A2.id, buffer.A2.op, buffer.A2.Vj, buffer.A2.Vk, buffer.A2.Qj, buffer.A2.Qk, buffer.A2.busy, buffer.A2.cyclesRemaining),
        createData("A3", buffer.A3.id, buffer.A3.op, buffer.A3.Vj, buffer.A3.Vk, buffer.A3.Qj, buffer.A3.Qk, buffer.A3.busy, buffer.A3.cyclesRemaining),
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

export default AddBuffer

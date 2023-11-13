import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  SvgIcon,
  IconButton
} from '@mui/material';
import { EditRounded, DeleteRounded } from '@mui/icons-material';
import PropTypes from 'prop-types';

const styles = {
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
};

// Custom Table
export default function CustomTable({
  columns,
  rows,
  page,
  setPage = () => {},
  pageSize,
  setPageSize = () => {},
  handleResetPassword = () => {},
  handleDeleteUser = () => {}
}) {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 740 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * pageSize, page * pageSize + pageSize)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                  <TableCell style={styles.row}>
                    <IconButton onClick={() => handleResetPassword(index)}>
                      <SvgIcon>
                        <EditRounded />
                      </SvgIcon>
                    </IconButton>
                    <IconButton onClick={() => handleDeleteUser(index)}>
                      <SvgIcon>
                        <DeleteRounded />
                      </SvgIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={pageSize}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

CustomTable.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  page: PropTypes.number,
  setPage: PropTypes.func,
  pageSize: PropTypes.number,
  setPageSize: PropTypes.func,
  handleResetPassword: PropTypes.func,
  handleDeleteUser: PropTypes.func,
};

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import DataContext from '../context/DataContext';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';



// component button handlers
function TablePaginationActions(props) {
    const { handleLoadMore } = useContext(DataContext);
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        // (page % 2 == 0 ) ? handleLoadMore() : "";
        // handleLoadMore();
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                // Disable button when hasMoreData is false
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

// function createData(name, calories, fat) {
//     return { name, calories, fat };
// }

// my try to create
//   const arr = {};
//   data.forEach(element => {
//     return ({
//         id: element.id,
//         name: element.name,
//         position: element.position,
//         salary: element.salary,
//     })
//   });
// const rows = [
//     createData('Cupcake', 305, 3.7),
// ].sort((a, b) => (a.calories < b.calories ? -1 : 1))

// from 171 row
// (rowsPerPage > 0
//     ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//     : rows
// )
// component="th" scope="row"

const TableView = () => {

    const { data, handleLoadMore, docAmount } = useContext(DataContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    console.log(data);

    const rows = [
        { data }
    ]

    // create titles for each column
    const columns = [
        {
            id: 'id',
            label: 'id',
            align: 'center',
            minWidth: 100
        },
        {
            id: 'name',
            label: 'name',
            align: 'center',
            minWidth: 160
        },
        {
            id: 'position',
            label: 'position',
            minWidth: 160,
            align: 'center'
        },
        {
            id: ' salary',
            label: 'salary',
            minWidth: '25%',
            align: 'center'
        },
        {
            id: 'delete/edit',
            label: 'delete/edit',
            minWidth: '15%',
            align: 'center'
        },

    ];

    //   {/*Avoid a layout jump when reaching the last page with empty rows*/}
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="custom pagination table">
                <TableBody>
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
                        </TableRow>
                    </TableHead>
                    {(rowsPerPage > 0
                        ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : data
                    ).map((row) => (
                        <TableRow key={row.id}>
                            {/* todo: check what this do component="th" scope="row"  */}
                            <TableCell component="th" scope="row" style={{ width: "20%" }} align="center" >
                                {row.id}
                            </TableCell>
                            <TableCell style={{ width: "20%" }} align="center">
                                {row.name}
                            </TableCell>
                            <TableCell style={{ width: "20%" }} align="center">
                                {row.position}
                            </TableCell>
                            <TableCell style={{ width: "20%" }} align="center">
                                {row.salary}
                            </TableCell>
                            <div className='d-flex gap-2  mt-3'>
                            {/* Pass row ID for deletion */}
                            <Button onClick={() => DeleteEmployee(row.id)} size="small" variant="outlined" startIcon={<DeleteIcon />}>
                            </Button>
                            {/* Pass row ID for edition */}
                            <Button onClick={() => EditEmployee(row.id)} size="small" variant="outlined" startIcon={<EditIcon />}>
                            </Button>
                            </div>
                        </TableRow>
                    ))}
                    {/* check this function
                     {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )} */}

                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10]}
                            colSpan={3}
                            count={docAmount}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            slotProps={{
                                select: {
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                },
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

export default TableView;

import React from 'react';
import { csv } from 'd3';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';

import dataCSV from '../data/books.csv';

const Books = () => {
    const [data, updateData] = React.useState();

    React.useEffect(
        () => {
            csv(dataCSV).then(updateData);
        },
        []
    );

    if (!data) {
        return 'No Data';
    }

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        {data.columns.map((column) => (
                            <TableCell key={column}>{column}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.Title} hover>
                            {data.columns.map((column) => (
                                <TableCell key={column}>
                                    {row[column]}
                                </TableCell>    
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Books;

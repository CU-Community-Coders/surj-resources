import React from 'react';
import { csv } from 'd3';
import {
    FormControl,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
    makeStyles
} from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));

const DataTable = ({ dataUrl }) => {
    const classes = useStyle();

    const [originalData, updateOriginalData] = React.useState(null);
    const [columns, updateColumns] = React.useState([]);
    const [processedData, updateProcessedData] = React.useState(null);

    const [search, updateSearch] = React.useState('');
    const [sorts, updateSorts] = React.useState({});

    React.useEffect(
        () => {
            csv(dataUrl).then((response) => {
                updateOriginalData(response);
                updateColumns(response.columns);
                updateProcessedData(response);
            });
        },
        [dataUrl]
    );

    const filterData = (data, searchTerm) => {
        if (searchTerm) {
            return data.filter((row) => {
                const cells = Object.values(row);
                for (let i = 0; i < cells.length; i++) {
                    if (cells[i] && cells[i].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                        return true;
                    }
                }
                return false;
            });
        }
        return data;
    };

    const sortData = (data, sortValues) => {
        Object.entries(sortValues).forEach(([column, direction]) => {
            data.sort((row1, row2) => {
                let rowDirection = 0;
                if (direction) {
                    if (direction === 'asc') {
                        if (row1[column] && row2[column]) {
                            rowDirection += row1[column].localeCompare(row2[column]);
                        } else if (row1[column]) {
                            rowDirection += 1;
                        } else {
                            rowDirection -= 1;
                        }
                    } else if (direction === 'desc') {
                        if (row1[column] && row2[column]) {
                            rowDirection -= row1[column].localeCompare(row2[column]);
                        } else if (row1[column]) {
                            rowDirection -= 1;
                        } else {
                            rowDirection += 1;
                        }
                    }
                }
                return rowDirection;
            });
        });
        return data;
    }

    const handleSearchUpdate = ({ target: { value } }) => {
        updateProcessedData(sortData(filterData(originalData, value), sorts));
        updateSearch(value);
    };

    const handleSortsUpdate = (column) => {
        const updatedSorts = { ...sorts };
        if (!sorts[column]) {
            updatedSorts[column] = 'asc';
        } else {
            if (sorts[column] === 'asc') {
                updatedSorts[column] = 'desc';
            } else {
                updatedSorts[column] = '';
            }
        }

        
        updateProcessedData(sortData(filterData(originalData, search), updatedSorts));
        updateSorts(updatedSorts);
    };

    return (
        <TableContainer item component={Grid}>
            <Grid item>
                <FormControl className={classes.formControl}>
                    <TextField label="Search" value={search} onChange={handleSearchUpdate} />
                </FormControl>
            </Grid>
            <Grid item>
                {!processedData ?
                    'No Data' :
                    <Table stickyHeader size="small">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell key={column}>
                                        <TableSortLabel
                                            active={!!sorts[column]}
                                            direction={sorts[column] ? sorts[column] : 'asc'}
                                            onClick={() => handleSortsUpdate(column)}
                                        >
                                            {column}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {processedData.map((row) => (
                                <TableRow key={Object.values(row)[0]} hover>
                                    {columns.map((column) => (
                                        <TableCell key={column}>
                                            {row[column]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
            </Grid>
        </TableContainer>
    );
};

export default DataTable;

import React from 'react';
import { Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { RawDataStructure } from './rawDataStructure';

export interface FlattData {
    dataStructure: RawDataStructure;
}

export const FlattData = (props: FlattData) => {
    const { dataStructure } = props;
    const { flattData } = dataStructure || {};
    return flattData ? (
        <Table size="small" aria-label="a dense table">
            <TableBody>
                {flattData.map((row) => (
                    <TableRow>
                        {row.map((cell) => (
                            <TableCell align="right">{cell}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ) : (
        <>
            <Skeleton variant="text" height={30} />
            <Skeleton variant="text" height={30} />
            <Skeleton variant="text" height={30} />
            <Skeleton variant="text" height={30} />
            <Skeleton variant="text" height={30} />
            <Skeleton variant="text" height={30} />
        </>
    );
};

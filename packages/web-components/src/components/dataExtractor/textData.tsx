import React from 'react';
import { Paper } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { LazyLog } from 'react-lazylog';
import { RawDataStructure } from './rawDataStructure';

export interface TextDataProps {
    dataStructure: RawDataStructure;
    showClean?: boolean;
}

export const TextData = (props: TextDataProps) => {
    const { dataStructure, showClean } = props;
    const { rawText, cleanText } = dataStructure || {};
    const text = showClean ? cleanText : rawText;
    return (
        <Paper style={{ minHeight: '200px' }}>
            {text ? (
                <LazyLog
                    text={text}
                    selectableLines
                    style={{
                        borderRadius: '5px',
                        fontFamily: 'Courier'
                    }}
                />
            ) : (
                <>
                    <Skeleton variant="text" height={30} />
                    <Skeleton variant="text" height={30} />
                    <Skeleton variant="text" height={30} />
                    <Skeleton variant="text" height={30} />
                    <Skeleton variant="text" height={30} />
                    <Skeleton variant="text" height={30} />
                    <Skeleton variant="text" height={30} />
                </>
            )}
        </Paper>
    );
};

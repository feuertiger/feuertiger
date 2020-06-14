import React from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    TextField
} from '@material-ui/core';
import type { ExtractorOptions } from './rawDataStructure';

export interface ParsingOptionsProps {
    options: ExtractorOptions;
}

export const ParsingOptions = (props: ParsingOptionsProps) => {
    const { options } = props;
    const { colSeperator, rowSeprator, rowLength } = options || {};
    return (
        <Card>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography gutterBottom variant="h6" component="h2">
                            Parsing Options
                        </Typography>
                    </Grid>
                    <Grid item xs="auto">
                        <TextField
                            required={!rowLength}
                            id="rowSeprator"
                            name="Row Seperator"
                            label="Row Seperator"
                            InputLabelProps={{
                                shrink: true
                            }}
                            variant="filled"
                            value={rowSeprator}
                        />
                    </Grid>
                    <Grid item xs="auto">
                        <TextField
                            required={!rowSeprator}
                            id="rowLength"
                            type="number"
                            name="Row Length"
                            label="Row Length"
                            InputLabelProps={{
                                shrink: true
                            }}
                            variant="filled"
                            value={rowLength}
                        />
                    </Grid>
                    <Grid item xs="auto">
                        <TextField
                            required
                            id="colSeperator"
                            name="Cell Seperator"
                            label="Cell Seperator"
                            InputLabelProps={{
                                shrink: true
                            }}
                            variant="filled"
                            value={colSeperator}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

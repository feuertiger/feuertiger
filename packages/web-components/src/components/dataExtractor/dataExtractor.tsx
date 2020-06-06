import React from 'react';
import {
    Grid,
    Table,
    TableContainer,
    TableBody,
    Paper,
    TableRow,
    TableCell,
    Card,
    CardContent,
    Typography,
    TextField,
    Switch,
    Button,
    Stepper,
    Step,
    StepLabel,
    StepContent
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { tryGetPreviewData } from 'next/dist/next-server/server/api-utils';
import { RawDataStructure, ExtractorOptions } from './rawDataStructure';
import { FileInfo } from './fileInfo';
import { RawText } from './rawText';
import { ParsingOptions } from './parsingOptions';
import { FlattData } from './flattData';

export interface DataExtractorProps {}

interface State {
    file: File | null | undefined;
    dataStructure: RawDataStructure;
    options: ExtractorOptions;
    activeStep: number;
}

const DEFAULT_OPTIONS = {
    colSeperator: ';',
    rowSeprator: '\n',
    rowLength: null,
    splitBySeparator: true
};

export class DataExtractor extends React.Component<DataExtractorProps, State> {
    constructor(props: DataExtractorProps) {
        super(props);
        this.state = {
            activeStep: 0,
            file: null,
            dataStructure: null,
            options: DEFAULT_OPTIONS
        };
    }

    handleChangeDropzone = async ([file]: File[]): Promise<void> => {
        if (file) {
            await this.loadFile(file);
            this.setState({
                file
            });
        } else {
            this.handleReset();
        }
    };

    handleReset = () =>
        this.setState({
            file: null,
            dataStructure: null,
            options: DEFAULT_OPTIONS
        });

    loadFile = async (file: File) => {
        const { options } = this.state;
        const dataStructure = new RawDataStructure(options);
        await dataStructure.load(file);
        this.setState({ dataStructure });
    };

    clean = async () => {
        const { dataStructure, options } = this.state;
        dataStructure.setOptions(options);
        await dataStructure.clean();
        this.setState({ dataStructure });
    };

    parse = async () => {
        const { dataStructure, options } = this.state;
        dataStructure.setOptions(options);
        await dataStructure.parse();
        this.setState({ dataStructure });
    };

    handleNext = () =>
        this.setState(({ activeStep }) => ({
            activeStep: activeStep + 1
        }));

    handleBack = () =>
        this.setState(({ activeStep }) => ({
            activeStep: activeStep - 1
        }));

    render() {
        const { file, dataStructure, options, activeStep } = this.state;
        return (
            <Stepper activeStep={activeStep} orientation="vertical">
                <Step key="Select file">
                    <StepLabel>Select file</StepLabel>
                    <StepContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <FileInfo
                                    file={file}
                                    handleChangeDropzone={
                                        this.handleChangeDropzone
                                    }
                                />
                            </Grid>
                            <Grid item xs="auto">
                                <Button
                                    autoFocus
                                    color="primary"
                                    variant="contained"
                                    disabled={!file}
                                    onClick={this.handleReset}
                                >
                                    Reset
                                </Button>
                            </Grid>
                            <Grid item xs="auto">
                                <Button
                                    autoFocus
                                    color="primary"
                                    variant="contained"
                                    disabled={!file}
                                    onClick={this.handleNext}
                                >
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </StepContent>
                </Step>
                <Step key="Clean data">
                    <StepLabel>Clean data</StepLabel>
                    <StepContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <RawText dataStructure={dataStructure} />
                            </Grid>
                            <Grid item xs={12}>
                                <ParsingOptions options={options} />
                            </Grid>
                            <Grid item xs="auto">
                                <Button
                                    autoFocus
                                    color="primary"
                                    variant="contained"
                                    onClick={this.handleBack}
                                >
                                    Back
                                </Button>
                            </Grid>
                            <Grid item xs="auto">
                                <Button
                                    autoFocus
                                    color="primary"
                                    variant="contained"
                                    onClick={this.handleNext}
                                >
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </StepContent>
                </Step>
                <Step key="Parse data">
                    <StepLabel>Parse data</StepLabel>
                    <StepContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <RawText dataStructure={dataStructure} />
                            </Grid>
                            <Grid item xs={12}>
                                <ParsingOptions options={options} />
                            </Grid>
                            <Grid item xs={12}>
                                <FlattData dataStructure={dataStructure} />
                            </Grid>
                            <Grid item xs="auto">
                                <Button
                                    autoFocus
                                    color="primary"
                                    variant="contained"
                                    onClick={this.handleBack}
                                >
                                    Back
                                </Button>
                            </Grid>
                            <Grid item xs="auto">
                                <Button
                                    autoFocus
                                    color="primary"
                                    variant="contained"
                                    onClick={this.handleNext}
                                >
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </StepContent>
                </Step>
                <Step key="Structure data">
                    <StepLabel>Structure data</StepLabel>
                    <StepContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <FlattData dataStructure={dataStructure} />
                            </Grid>
                            <Grid item xs={12}>
                                <ParsingOptions options={options} />
                            </Grid>
                            <Grid item xs="auto">
                                <Button
                                    autoFocus
                                    color="primary"
                                    variant="contained"
                                    onClick={this.handleBack}
                                >
                                    Back
                                </Button>
                            </Grid>
                            <Grid item xs="auto">
                                <Button
                                    autoFocus
                                    color="primary"
                                    variant="contained"
                                    onClick={this.handleNext}
                                >
                                    Finish
                                </Button>
                            </Grid>
                        </Grid>
                    </StepContent>
                </Step>
            </Stepper>
        );
    }
}

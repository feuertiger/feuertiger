import React, { ReactNode } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextField,
    Fab,
    Typography,
    DialogContentText
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import Webcam from 'react-webcam';

export interface AddMemberProps {
    handleClose: () => void;
    open: boolean;
    startOcr: (
        video: HTMLVideoElement,
        handleData: (data: string) => void
    ) => Promise<() => void>;
}

interface State {
    showCam: boolean;
    ocrData?: string;
    dateOfBirth: Date;
}

const videoConstraints = {
    // width: 1280,
    // height: 720,
    facingMode: 'environment'
};

export class AddMember extends React.Component<AddMemberProps, State> {
    webcamRef: React.RefObject<Webcam> & React.RefObject<HTMLVideoElement>;

    stopOcr: () => void | undefined;

    constructor(props: AddMemberProps) {
        super(props);
        this.state = {
            showCam: false,
            dateOfBirth: new Date()
        };
        this.webcamRef = React.createRef();
    }

    componentWillUnmount(): void {
        if (this.stopOcr) {
            this.stopOcr();
        }
    }

    handleOCR = async (): Promise<void> => {
        this.setState({ showCam: true });
    };

    handleCapture = (): void => {
        if (this.stopOcr) {
            this.stopOcr();
        }
        this.setState({ showCam: false });
    };

    handleOCRData = (data: string): void => {
        this.setState({
            ocrData: data
        });
    };

    handleUserMedia = async (): Promise<void> => {
        const { startOcr } = this.props;
        const { video } = this.webcamRef.current;
        const stopOCR = await startOcr(video, this.handleOCRData);
        this.stopOcr = stopOCR;
    };

    render(): ReactNode {
        const { handleClose, open } = this.props;
        const { showCam, ocrData, dateOfBirth } = this.state;
        return (
            <Dialog
                onClose={handleClose}
                aria-labelledby="simple-dialog-title"
                open={open}
            >
                <DialogTitle id="simple-dialog-title">
                    Mitglied hinzufügen
                </DialogTitle>
                <DialogContent style={{ overflowY: 'initial' }}>
                    {showCam ? (
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Webcam
                                    style={{ width: '100%' }}
                                    onUserMedia={this.handleUserMedia}
                                    audio={false}
                                    ref={this.webcamRef}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={videoConstraints}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <DialogContentText>{ocrData}</DialogContentText>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography color="inherit" noWrap>
                                    <Fab
                                        color="primary"
                                        aria-label="edit"
                                        onClick={this.handleOCR}
                                    >
                                        <CenterFocusStrongIcon />
                                    </Fab>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="firstName"
                                    name="Vorname"
                                    label="Vorname"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="lastName"
                                    name="Nachname"
                                    label="Nachname"
                                    fullWidth
                                />
                            </Grid>
                            {/* TODO fix this issue */}
                            <Grid item xs={12}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="dateOfBirth"
                                    label="Geburtsdatum"
                                    value={dateOfBirth}
                                    onChange={() => {}}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="city"
                                    name="Stadt"
                                    label="Stadt"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="zipCode"
                                    name="PLZ"
                                    label="PLZ"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="street"
                                    name="Straße"
                                    label="Straße"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="number"
                                    name="Nummer"
                                    label="Nummer"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    {showCam ? (
                        <Button
                            autoFocus
                            onClick={this.handleCapture}
                            color="primary"
                        >
                            Übernehmen
                        </Button>
                    ) : (
                        <>
                            <Button
                                autoFocus
                                onClick={handleClose}
                                color="primary"
                            >
                                Abbrechen
                            </Button>
                            <Button onClick={handleClose} color="primary">
                                Speichern
                            </Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        );
    }
}

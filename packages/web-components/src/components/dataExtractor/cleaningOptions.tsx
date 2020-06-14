import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button,
    TextField
} from '@material-ui/core';
import type { ExtractorOptions } from './rawDataStructure';

export interface CleaningOptionsProps {
    options: ExtractorOptions;
}

interface State {
    showAddRuleDialog: boolean;
}

export class CleaningOptions extends React.Component<
    CleaningOptionsProps,
    State
> {
    constructor(props: CleaningOptionsProps) {
        super(props);
        this.state = {
            showAddRuleDialog: false
        };
    }

    handleAddRule = () => this.setState({ showAddRuleDialog: true });

    render() {
        const { showAddRuleDialog } = this.state;
        const { options } = this.props;
        const { cleaningRules } = options || {};
        return (
            <Card>
                <CardContent>
                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={showAddRuleDialog}
                    >
                        <DialogTitle id="simple-dialog-title">
                            Add Rule
                        </DialogTitle>
                        <DialogContent style={{ overflowY: 'hidden' }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="rowSeprator"
                                        name="Row Seperator"
                                        label="Row Seperator"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        variant="filled"
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="h2"
                            >
                                Cleaning Rules
                            </Typography>
                        </Grid>
                        <Grid item xs="auto">
                            <List>
                                {cleaningRules.map(() => (
                                    <ListItem>
                                        <ListItemText
                                            primary="Name"
                                            secondary="rule"
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                autoFocus
                                color="primary"
                                variant="contained"
                                onClick={this.handleAddRule}
                            >
                                Add Rule
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

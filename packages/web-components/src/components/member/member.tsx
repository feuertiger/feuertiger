import React from 'react';
import { Grid, Paper, Button, CircularProgress, Fab } from '@material-ui/core';
import MaterialTable from 'material-table';
import EditIcon from '@material-ui/icons/Edit';
import { startOcr } from '@feuertiger/ocr';
import { AllPersonsQueryResult } from '@feuertiger/schema-graphql';
import { AddMember } from '../addMember/addMember';

interface State {
    addDialogOpen: boolean;
}

const MemberTable = ({
    member
}: {
    member: AllPersonsQueryResult['data']['allPersons'];
}) => {
    return (
        <MaterialTable
            options={{
                exportButton: true,
                filtering: true,
                grouping: true,
                search: true,
                sorting: true
            }}
            columns={[
                { title: 'Vorname', field: 'firstname' },
                { title: 'Nachname', field: 'lastname' },
                {
                    field: 'edit',
                    title: '',
                    filtering: false,
                    render: () => (
                        <Fab color="primary" aria-label="edit">
                            <EditIcon />
                        </Fab>
                    )
                }
            ]}
            data={member}
            title="Mitglieder"
        />
    );
};

export interface MemberProps extends AllPersonsQueryResult {}

export class Member extends React.Component<MemberProps, State> {
    constructor(props: MemberProps) {
        super(props);
        this.state = {
            addDialogOpen: false
        };
    }

    handleOpenAddDialog = () => this.setState({ addDialogOpen: true });

    handleCloseAddDialog = () => this.setState({ addDialogOpen: false });

    render() {
        const { addDialogOpen } = this.state;
        const {
            error,
            loading,
            data: { allPersons }
        } = this.props;

        let content = null;

        if (loading) {
            content = <CircularProgress />;
        } else if (error) {
            content = <p>Error :(</p>;
        } else if (allPersons) {
            content = <MemberTable member={allPersons} />;
        }

        return (
            <>
                <AddMember
                    startOcr={startOcr}
                    open={addDialogOpen}
                    handleClose={this.handleCloseAddDialog}
                />
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={6} lg={4}>
                        <Button
                            id="add-member-button"
                            variant="contained"
                            color="primary"
                            onClick={this.handleOpenAddDialog}
                        >
                            Mitglied hinzufügen
                        </Button>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper>{content}</Paper>
                    </Grid>
                </Grid>
            </>
        );
    }
}

import React from 'react';
import { graphql, DataProps } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import { Grid, Paper, Button, CircularProgress, Fab } from '@material-ui/core';
import MaterialTable from 'material-table';
import EditIcon from '@material-ui/icons/Edit';
import AddMember from './addMember';

interface State {
    addDialogOpen: boolean;
}

interface Person {
    id: string;
    firstname: string;
    lastname: string;
}

interface Data {
    loading: boolean;
    error: any;
    allPersons: Person[];
}

interface Props extends DataProps<Data> {}

const MemberTable = ({ member }: { member: Person[] }) => {
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

class Member extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            addDialogOpen: false
        };
    }

    handleOpenAddDialog = () => this.setState({ addDialogOpen: true });

    handleCloseAddDialog = () => this.setState({ addDialogOpen: false });

    render() {
        const { addDialogOpen } = this.state;
        const { data } = this.props;
        const { loading, error, allPersons } = data || {};

        let content = null;

        if (loading) {
            content = <CircularProgress />;
        } else if (error) {
            content = <p>Error :(</p>;
        } else if (data) {
            content = <MemberTable member={allPersons} />;
        }

        return (
            <>
                <AddMember
                    open={addDialogOpen}
                    handleClose={this.handleCloseAddDialog}
                />
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={6} lg={4}>
                        <Button
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

export default graphql(gql`
    {
        allPersons {
            id
            firstname
            lastname
        }
    }
`)(Member);

import React from 'react';
import { TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { PersonExercisesParticipatedFragment } from '@feuertiger/schema-graphql';

import { DetailTable } from '../index';

export interface MemberExercisesDetailsProps
    extends PersonExercisesParticipatedFragment {}

interface State {
    editMode: boolean;
}

export class MemberExercisesDetails extends React.Component<
    MemberExercisesDetailsProps,
    State
> {
    constructor(props: MemberExercisesDetailsProps) {
        super(props);
        this.state = { editMode: false };
    }

    private handleClickEdit = () => this.setState({ editMode: true });

    private handleClickDiscard = () => {
        this.props?.resetForm();
        this.setState({ editMode: true });
    };

    private handleClickBack = () => {
        this.props?.resetForm();
        this.setState({ editMode: false });
    };

    private handleClickSave = () => {
        const { values } = this.props;
        console.log('values: ', values);
        this.setState({ editMode: false });
    };

    render() {
        const { exercisesParticipated } = this.props;
        const { editMode } = this.state;

        return (
            <DetailTable
                label="Übungen"
                loading={!exercisesParticipated}
                editMode={editMode}
                handleClickSave={this.handleClickSave}
                handleClickDiscard={this.handleClickDiscard}
                handleClickBack={this.handleClickBack}
                handleClickEdit={this.handleClickEdit}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Thema</TableCell>
                        <TableCell align="right">Datum</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {exercisesParticipated?.map((exercise) => (
                        <TableRow key={exercise.id}>
                            <TableCell component="th" scope="row">
                                {exercise.topic}
                            </TableCell>
                            <TableCell align="right">
                                {exercise?.timeslot?.start}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </DetailTable>
        );
    }
}

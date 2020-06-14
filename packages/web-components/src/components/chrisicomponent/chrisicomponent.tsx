import React from 'react';
import { Button } from '@material-ui/core';

interface State {
    showName: boolean;
}

export interface ChrisComponentProps {
    name: String;
}

export class ChrisComponent extends React.Component<
    ChrisComponentProps,
    State
> {
    constructor(props: ChrisComponentProps) {
        super(props);
        this.state = {
            showName: true
        };
    }

    render() {
        const { showName } = this.state;
        const { name } = this.props;
        return showName ? (
            <p>
                hallo {name}!
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.setState({ showName: false })}
                >
                    hide name
                </Button>
            </p>
        ) : (
            <p>
                hallo
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.setState({ showName: true })}
                >
                    Shwo name
                </Button>
            </p>
        );
    }
}

// export const ChrisComponent = ({ name }: ChrisComponentProps) => (
//     <p>Hallo {name}</p>
// );

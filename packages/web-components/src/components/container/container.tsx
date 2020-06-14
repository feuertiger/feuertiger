import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { CssBaseline, Container as MuiContainer } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { AppBar } from '../appBar/appBar';
import { SideBar } from '../sideBar/sideBar';
import { AuthProps } from '../../types/authProps';

export interface ContainerProps extends AuthProps {
    children?: React.ReactNode | null | undefined;
}

interface State {
    open: boolean;
}

const StyledMain = styled.main`
    flex-grow: 1;
    overflow: auto;
    margin-top: ${({ theme }) => theme.spacing(7)}px;
    height: calc(100vh - ${({ theme }) => theme.spacing(7)}px);

    @media (min-width: ${({ theme }) =>
            theme.breakpoints.values.xs}px) and (orientation: landscape) {
        margin-top: 48px;
        height: calc(100vh - ${({ theme }) => theme.spacing(6)}px);
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
        margin-top: 64px;
        height: calc(100vh - ${({ theme }) => theme.spacing(8)}px);
    }
`;

const StyledContainer = styled(MuiContainer)`
    padding-top: ${({ theme }) => theme.spacing(4)}px;
    padding-bottom: ${({ theme }) => theme.spacing(4)}px;
`;

const RootDiv = styled.div`
    display: flex;
`;

export class Container extends React.Component<ContainerProps, State> {
    constructor(props: ContainerProps) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleDrawerOpen = () => this.setState({ open: true });

    handleDrawerClose = () => this.setState({ open: false });

    render() {
        const { open } = this.state;
        const { children, auth } = this.props;
        return (
            <RootDiv>
                <CssBaseline />
                <AppBar
                    open={open}
                    handleDrawerOpen={this.handleDrawerOpen}
                    auth={auth}
                />
                <SideBar
                    open={open}
                    handleDrawerClose={this.handleDrawerClose}
                />
                <StyledMain>
                    <StyledContainer maxWidth="lg">
                        {children || (
                            <>
                                <Skeleton height={40} />
                                <Skeleton variant="rect" height={190} />
                                <Skeleton height={40} />
                                <Skeleton variant="rect" height={190} />
                                <Skeleton height={40} />
                                <Skeleton variant="rect" height={190} />
                                <Skeleton height={40} />
                                <Skeleton variant="rect" height={190} />
                            </>
                        )}
                    </StyledContainer>
                </StyledMain>
            </RootDiv>
        );
    }
}

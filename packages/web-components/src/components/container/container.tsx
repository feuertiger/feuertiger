import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { CssBaseline, Container as MuiContainer } from '@material-ui/core';
import { AppBar } from '../appBar/appBar';
import { SideBar } from '../sideBar/sideBar';
import AuthProps from '../../types/authProps';

export interface ContainerProps extends AuthProps {
    children?: ReactNode;
}

interface State {
    open: boolean;
}

const StyledMain = styled.main`
    flex-grow: 1;
    height: 100vh;
    overflow: auto;
`;

const AppBarSpacer = styled.div`
    ${({ theme }) => theme.mixins.toolbar}
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
                    <AppBarSpacer />
                    <StyledContainer maxWidth="lg">{children}</StyledContainer>
                </StyledMain>
            </RootDiv>
        );
    }
}

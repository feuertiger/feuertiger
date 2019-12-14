import React from 'react';
import styled from 'styled-components';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;

const StyledAppBar = styled(({ open, ...props }) => <AppBar {...props} />)`
    z-index: 1;
    transition: ${({ open, theme: { transitions } }) =>
        transitions.create(['width', 'margin'], {
            easing: transitions.easing.sharp,
            duration: transitions.duration.leavingScreen
        }) + open
            ? transitions.create(['width', 'margin'], {
                  easing: transitions.easing.sharp,
                  duration: transitions.duration.enteringScreen
              })
            : ''} !important;
    ${({ open }) =>
        open
            ? `
    margin-left: ${drawerWidth}px;
    width: calc(100% - ${drawerWidth}px) !important;`
            : ''}
`;

const StyledToolbar = styled(Toolbar)`
    padding-right: 24;
`;

const StyledIconButton = styled(({ open, ...props }) => (
    <IconButton {...props} />
))`
    margin-right: 36;
    display: ${({ open }) => (open ? 'none' : 'unset')};
`;

const StyledTypography = styled(Typography)`
    flex-grow: 1;
`;

interface Props {
    open: boolean;
    handleDrawerOpen: () => void;
    signOut: () => void;
}

export default class Bar extends React.Component<Props> {
    handleLogout = () => this.props.signOut();

    render() {
        const { open, handleDrawerOpen } = this.props;
        return (
            <StyledAppBar position="absolute" open={open}>
                <StyledToolbar>
                    <StyledIconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        open={open}
                    >
                        <MenuIcon />
                    </StyledIconButton>
                    <StyledTypography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                    >
                        Dashboard
                    </StyledTypography>
                    <IconButton color="inherit" onClick={this.handleLogout}>
                        <ExitToAppIcon />
                    </IconButton>
                </StyledToolbar>
            </StyledAppBar>
        );
    }
}

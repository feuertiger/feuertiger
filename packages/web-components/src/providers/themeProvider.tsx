/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from 'styled-components';
import red from '@material-ui/core/colors/red';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#c90024'
        },
        secondary: {
            main: '#19857b'
        },
        error: {
            main: red.A400
        },
        background: {
            default: '#fff'
        }
    }
});

export interface ThemeProviderProps {
    children: React.ComponentType;
}

export class ThemeProvider extends React.Component<Props> {
    componentDidMount() {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        const { children } = this.props;

        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
            </MuiPickersUtilsProvider>
        );
    }
}

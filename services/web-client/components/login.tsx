import React from 'react';
import {
    TextField,
    CssBaseline,
    Button,
    Avatar,
    Dialog,
    DialogContent
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

import { AuthProps } from '../container/withAuth';

const PaperDiv = styled.div`
    margin: ${({ theme }) => theme.spacing(8, 4)};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledAvatar = styled(Avatar)`
    margin: ${({ theme }) => theme.spacing(1)};
    background-color: ${({ theme }) => theme.palette.secondary.main};
`;

const StyledForm = styled.form`
    width: 100%;
    margin-top: ${({ theme }) => theme.spacing(1)};
`;

const SubmitButton = styled(Button)`
    margin: ${({ theme }) => theme.spacing(3, 0, 2)};
`;

interface Props extends AuthProps {}

export default class Login extends React.Component<Props> {
    handleLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const { auth } = this.props;
        auth.signInWithEmailAndPassword(email, password);
    };

    render() {
        return (
            <Dialog aria-labelledby="simple-dialog-title" open>
                <DialogContent>
                    <PaperDiv>
                        <CssBaseline />
                        <StyledAvatar>
                            <LockOutlinedIcon />
                        </StyledAvatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <StyledForm noValidate onSubmit={this.handleLogin}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            {/* <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            /> */}
                            <SubmitButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Login
                            </SubmitButton>
                            {/* <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid> */}
                        </StyledForm>
                    </PaperDiv>
                </DialogContent>
            </Dialog>
        );
    }
}

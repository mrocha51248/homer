import React, { Component } from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { Box, Button, Divider, IconButton, Link, Slide, Snackbar, Stack, TextField } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        passwordBis: '',
        firstName: '',
        lastName: '',
        flash: '',
    };

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.password !== this.state.passwordBis) {
            this.setState({ "flash": "Passwords are different" })
            return;
        }

        this.fetchSignUp();
    }

    fetchSignUp() {
        fetch("/auth/signup",
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName
                }),
            })
            .then(res => {
                if (res.ok) this.setState({ redirect: "/" });
                const isJson = res.headers.get('content-type')?.includes('application/json');
                if (!isJson) throw new Error(res.statusText);
                return res.json();
            })
            .then(json => {
                if (json.flash) this.setState({ "flash": json.flash });
            })
            .catch(err => this.setState({ "flash": err.toString() }));
    }

    render() {
        const closeSnackbarButton = (
            <IconButton
                size="small"
                color="inherit"
                onClick={() => this.setState({flash: ''})}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        );

        return (
            <div>
                <h1>Sign up</h1>
                <Snackbar
                    open={!!this.state.flash}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    message={this.state.flash}
                    TransitionComponent={(props) => <Slide {...props} direction="up" />}
                    action={closeSnackbarButton}
                />
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <Stack spacing={2} sx={{ width: '90%', maxWidth: 400 }}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            variant="standard"
                            value={this.state.email}
                            onChange={this.handleInputChange.bind(this)}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            variant="standard"
                            value={this.state.password}
                            onChange={this.handleInputChange.bind(this)}
                        />
                        <TextField
                            label="Confirm Password"
                            name="passwordBis"
                            type="password"
                            variant="standard"
                            value={this.state.passwordBis}
                            onChange={this.handleInputChange.bind(this)}
                        />
                        <TextField
                            label="First Name"
                            name="firstName"
                            type="text"
                            variant="standard"
                            value={this.state.firstName}
                            onChange={this.handleInputChange.bind(this)}
                        />
                        <TextField
                            label="Last Name"
                            name="lastName"
                            type="text"
                            variant="standard"
                            value={this.state.lastName}
                            onChange={this.handleInputChange.bind(this)}
                        />
                        <Button variant="standard" type="submit">
                            Submit
                        </Button>
                    </Stack>
                </form>
                <Divider sx={{ m: 2 }} />
                <Box>
                    Already have an account ?{' '}
                    <Link underline="hover" component={RouterLink} to="/signin">
                        Sign in
                    </Link>
                </Box>
                {this.state.redirect && <Navigate to={this.state.redirect} />}
            </div>
        );
    }
}

export default SignUp;

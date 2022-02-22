import React, { Component } from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { Box, Button, Divider, Link, Stack, Snackbar, TextField } from '@mui/material';

class SignIn extends Component {
    state = {
        email: '',
        password: '',
        flash: '',
    };

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.fetchSignIn();
    }

    fetchSignIn() {
        fetch("/auth/signin",
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                }),
            })
            .then(res => res.json())
            .then(
                res => { if (res.ok) this.setState({ redirect: "/profile" }); this.setState({ "flash": res.flash }); },
                err => this.setState({ "flash": err.flash })
            );
    }

    render() {
        return (
            <div>
                <h1>Sign in</h1>
                <Snackbar open={!!this.state.flash} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} message={this.state.flash} />
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
                        <Button variant="standard" type="submit">
                            Submit
                        </Button>
                    </Stack>
                </form>
                <Divider sx={{ m: 2 }} />
                <Box>
                    Don't have an account yet ?{' '}
                    <Link underline="hover" component={RouterLink} to="/signup">
                        Sign up
                    </Link>
                </Box>
                {this.state.redirect && <Navigate to={this.state.redirect} />}
            </div>
        );
    }
}

export default SignIn;

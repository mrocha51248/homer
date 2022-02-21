import React, { Component } from 'react';

class SignUp extends Component {
    state = {
        email: this.props.email,
        password: '',
        passwordBis: '',
        firstName: 'James',
        lastName: 'Bond',
        flash: '',
    };

    updateEmailField(event) {
        this.setState({ email: event.target.value });
    }

    updatePasswordField(event) {
        this.setState({ password: event.target.value });
    }

    updatePasswordBisField(event) {
        this.setState({ passwordBis: event.target.value });
    }

    updateFirstNameField(event) {
        this.setState({ firstName: event.target.value });
    }

    updateLastNameField(event) {
        this.setState({ lastName: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("A name was submitted", this.state);

        if (this.state.password !== this.state.passwordBis) {
            this.setState({ "flash": "Les mots de passe sont differents" })
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
            .then(res => res.json())
            .then(
                res => this.setState({ "flash": res.flash }),
                err => this.setState({ "flash": err.flash })
            );
    }

    render() {
        return (
            <div>
                <h1>{JSON.stringify(this.state)}</h1>
                {this.state.flash && <h2>{this.state.flash}</h2>}
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={this.state.email}
                            onChange={this.updateEmailField.bind(this)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={this.state.password}
                            onChange={this.updatePasswordField.bind(this)}
                        />
                    </div>
                    <div>
                        <label htmlFor="passwordBis">Confirmation</label>
                        <input
                            type="password"
                            name="passwordBis"
                            id="passwordBis"
                            value={this.state.passwordBis}
                            onChange={this.updatePasswordBisField.bind(this)}
                        />
                    </div>
                    <div>
                        <label htmlFor="firstName">Prénom</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={this.state.firstName}
                            onChange={this.updateFirstNameField.bind(this)}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Nom</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={this.state.lastName}
                            onChange={this.updateLastNameField.bind(this)}
                        />
                    </div>
                    <button type="submit">Envoyer</button>
                </form>
            </div>
        );
    }
}

export default SignUp;

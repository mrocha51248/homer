import React, { Component } from 'react';

class SignUp extends Component {
    state = {
        email: this.props.email,
    };

    updateEmailField(event) {
        this.setState({ email: event.target.value });
    }

    render() {
        return (
            <div>
                <h1>{this.state.email}</h1>
                <input type="email" name="email" value={this.state.email} onChange={this.updateEmailField.bind(this)} />
            </div>
        );
    }
}

export default SignUp;

import React, { Component } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

class Profile extends Component {
    state = {
        profile: {
            email: "homer.simpson@wildcodeschool.fr",
            firstName: "Homer",
            lastName: "Simpson",
        }
    }

    render() {
        return (
            <List>
                <ListItem>
                    <ListItemText primary="Email" secondary={this.state.profile.email} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="First Name" secondary={this.state.profile.firstName} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Last Name" secondary={this.state.profile.lastName} />
                </ListItem>
            </List>
        );
    }
}

export default Profile;

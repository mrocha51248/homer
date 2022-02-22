import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Divider, Link, List, ListItem, ListItemText } from '@mui/material';

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
            <div>
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
                <Divider sx={{ m: 2 }} />
                <Box>
                    <Link underline="hover" component={RouterLink} to="/signin">
                        Disconnect
                    </Link>
                </Box>
            </div>
        );
    }
}

export default Profile;

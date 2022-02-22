import { Grid, Paper } from "@mui/material";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from "./components/Profile";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

import './App.css';

function App() {
  return (
    <Grid container alignItems='center' style={{ height: '100%' }}>
      <Grid item xs={12}>
        <Paper elevation={4} style={{ margin: 32 }}>
          <Grid container
            alignItems='center'
            justify='center'>
            <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
              <img src="/assets/images/wildhomer.png" />
            </Grid>
            <Grid item xs={12} sm={6} alignContent='center'>
              <BrowserRouter>
                <Routes>
                  <Route exact path="/" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </BrowserRouter>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default App;

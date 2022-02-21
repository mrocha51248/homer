import { Grid, Paper } from "@mui/material";
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
            <Grid item xs={6} alignContent='center'>
              <SignUp />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default App;

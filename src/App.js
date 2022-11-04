import { useState } from "react";
import { Button } from "@material-ui/core";
import VideoCall from "./VideoCall";
import {
  Container,
  CssBaseline,
  Avatar,
  TextField,
  Paper,
  Toolbar,
  Grid,
  Box,
  Typography,
} from "@material-ui/core";
function App() {
  const [inCall, setInCall] = useState(false);
  const [fullName, setFullName] = useState("Anish");
  const [Mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  console.log(fullName, Mobile, email);

  const handleJoinVideoCall = () => {
    setInCall(true);
    // setTimeout(() => {
    //   setFullName("");
    // }, 5000);
  };

  return (
    <div className="App" style={{ height: "100%" }}>
      {inCall ? (
        <VideoCall setInCall={setInCall} fullName={fullName} />
      ) : (
        <Container component="main" maxWidth="xs">
          {/* <CssBaseline /> */}
          <Box
            className=""
            component={Paper}
            p={2}
            style={{ marginTop: "48px" }}
          >
            <Box>
              <Typography component="h1" variant="h5">
                Virtual Call
              </Typography>
            </Box>

            <form>
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                name="fullName"
                label="Full Name"
                id="fullName"
                autoComplete="current-password"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                name="Mobile"
                label="Mobile"
                type="number"
                id="Mobile"
                value={Mobile}
                onChange={e => setMobile(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                name="email"
                label="Email(Optional)"
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              <Grid container>
                <Grid item xs>
                  <Button
                    disabled={fullName.length === 0 || Mobile.length === 0}
                    style={{ marginTop: "24px" }}
                    variant="contained"
                    color="primary"
                    onClick={handleJoinVideoCall}
                  >
                    Join Call
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      )}
    </div>
  );
}

export default App;

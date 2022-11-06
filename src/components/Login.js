import React, { useState, useEffect } from "react";
import {
  TextField,
  Paper,
  Button,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const initialValues = {
  mobile: "",
  password: "",
};

function Login() {
  const [inCall, setInCall] = useState(false);
  const [values, setValues] = useState(initialValues);
  // const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("isLogin") && (
      <Navigate to="/group-video-calling-app" />
    );
  }, []);
  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  console.log("value", values);

  const handleJoinVideoCall = () => {
    setInCall(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .get(
        `https://iplfarmersamvad.com/CMSWSIPL/ws/userAuth/json/${values.mobile}/${values.password}`
      )
      .then(response => {
        // alert("Alert!!!");
        // console.log("response!!!!", response?.data);
        localStorage.setItem("isLogin", true);
        Navigate({ to: "/group-video-calling-app" });
        alert("Alert!!!");
        // navigate("group-video-calling-app");

        setInCall(true);
        handleJoinVideoCall();
      })
      .catch(error => {
        console.error("There was an error!", error);
      });
  };

  return (
    <>
      {localStorage.getItem("isLogin") && (
        <Navigate to="/group-video-calling-app" replace={true} />
      )}
      <Container maxWidth="xs">
        <Box pt={8}>
          <Box className="" component={Paper} p={2}>
            <Box pb={2}>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="dense"
                placeholder="888 999 6612"
                required
                fullWidth
                name="mobile"
                label="Mobile"
                type="number"
                id="mobile"
                value={values.mobile}
                onChange={handleInputChange}
              />

              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                placeholder="*******"
                name="password"
                label="Password"
                id="password"
                value={values.password}
                type="password"
                onChange={handleInputChange}
              />

              <Button
                fullWidth
                disabled={
                  values.mobile.length < 10 || values.password.length === 0
                }
                style={{ marginTop: "24px", textTransform: "capitalize" }}
                variant="contained"
                color="primary"
                type="submit"
              >
                Login
              </Button>

              <Box pt={1}>
                <Typography>
                  Don't have an account ?{" "}
                  <span>
                    <Link to="/group-video-calling-app/signup">Sign Up</Link>
                  </span>
                </Typography>
              </Box>

              {/* <Grid container>
              <Grid item xs>
                <Button
                  disabled={values.mobile.length === 0}
                  style={{ marginTop: "24px", textTransform: "capitalize" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Login
                </Button>
              </Grid>
            </Grid> */}
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Login;

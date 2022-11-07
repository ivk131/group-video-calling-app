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
import axiosObj from "../axios";

const initialValues = {
  mobile: "",
  password: "",
};

function Login() {
  const [inCall, setInCall] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [response_userId, setResponse_userId] = useState();
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

  const getUserDetails = async () => {
    await axiosObj
      .post("/userAuth/agoratoken", {
        userId: localStorage.getItem("response_userId"),
        channelName: "",
        eventId: 12,
      })
      .then(response => {
        localStorage.setItem("agoraToken", response?.data?.agoraToken);
        localStorage.setItem("appId", response?.data?.appId);
        localStorage.setItem("channelName", response?.data?.channelName);
        localStorage.setItem(" eventId", response?.data?.eventId);
        localStorage.setItem("role", response?.data?.role);
        console.log("getUserDetails", response.data);
      });

    setInCall(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .get(
        `https://iplfarmersamvad.com/CMSWSIPL/ws/userAuth/json/${values.mobile}/${values.password}`
      )
      .then(response => {
        localStorage.setItem("isLogin", true);
        localStorage.setItem(
          "response_userId",
          response?.data?.response_userId
        );
        response?.data?.valid === false && alert("Invalid credentails!!");
      })
      .catch(error => {
        console.error("There was an error!", error);
      });

    getUserDetails();
    handleJoinVideoCall();
  };

  useEffect(() => {}, [
    localStorage.getItem("isLogin"),
    localStorage.getItem("agoraToken"),
  ]);

  return (
    <>
      {localStorage.getItem("isLogin") &&
        localStorage.getItem("agoraToken") && (
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
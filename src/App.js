import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import VideoCall from "./VideoCall";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container, Box, Typography } from "@material-ui/core";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import WelcomeScreen from "./components/WelcomeScreen";
import axios from "axios";

function App() {
  const [inCall, setInCall] = useState(true);
  const [fullName, setFullName] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const handleJoinVideoCall = () => {
    setInCall(true);
  };

  useEffect(() => {
    let isLogin = localStorage.getItem("isLogin");
    setIsLogin(true);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <Navigate
              to={
                isLogin
                  ? "/group-video-calling-app"
                  : "/group-video-calling-app/signup"
              }
              replace
            />
          }
        />
        <Route
          path="/group-video-calling-app"
          element={<VideoCall setInCall={setInCall} fullName={fullName} />}
        />
        <Route path="/group-video-calling-app/signup" element={<SignUp />} />
        <Route path="group-video-calling-app/login" element={<Login />} />
        <Route
          path="group-video-calling-app/welcome"
          element={<WelcomeScreen />}
        />
        <Route
          path="/group-video-calling-app"
          element={<VideoCall setInCall={setInCall} fullName={fullName} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
